import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Stepper from "../components/Stepper";
import { useLocation } from "react-router-dom";


// ✅ 郵遞區號資料
const postalCodeMap = {
  '臺北市': [
    { code: '100', name: '中正區' }, { code: '103', name: '大同區' }, { code: '104', name: '中山區' },
    { code: '105', name: '松山區' }, { code: '106', name: '大安區' }, { code: '108', name: '萬華區' },
    { code: '110', name: '信義區' }, { code: '111', name: '士林區' }, { code: '112', name: '北投區' },
    { code: '114', name: '內湖區' }, { code: '115', name: '南港區' }, { code: '116', name: '文山區' }
  ],
  '新北市': [
    { code: '207', name: '萬里區' }, { code: '208', name: '金山區' }, { code: '220', name: '板橋區' },
    { code: '221', name: '汐止區' }, { code: '222', name: '深坑區' }, { code: '223', name: '石碇區' },
    { code: '224', name: '瑞芳區' }, { code: '226', name: '平溪區' }, { code: '227', name: '雙溪區' },
    { code: '228', name: '貢寮區' }, { code: '231', name: '新店區' }, { code: '232', name: '坪林區' },
    { code: '233', name: '烏來區' }, { code: '234', name: '永和區' }, { code: '235', name: '中和區' },
    { code: '236', name: '土城區' }, { code: '237', name: '三峽區' }, { code: '238', name: '樹林區' },
    { code: '239', name: '鶯歌區' }, { code: '241', name: '三重區' }, { code: '242', name: '新莊區' },
    { code: '243', name: '泰山區' }, { code: '244', name: '林口區' }, { code: '247', name: '蘆洲區' },
    { code: '248', name: '五股區' }, { code: '249', name: '八里區' }, { code: '251', name: '淡水區' },
    { code: '252', name: '三芝區' }, { code: '253', name: '石門區' }
  ],
  '桃園市': [
    { code: '320', name: '中壢區' }, { code: '324', name: '平鎮區' }, { code: '325', name: '龍潭區' },
    { code: '326', name: '楊梅區' }, { code: '327', name: '新屋區' }, { code: '328', name: '觀音區' },
    { code: '330', name: '桃園區' }, { code: '333', name: '龜山區' }, { code: '334', name: '八德區' },
    { code: '335', name: '大溪區' }, { code: '336', name: '復興區' }, { code: '337', name: '大園區' },
    { code: '338', name: '蘆竹區' }
  ],
  '基隆市': [
    { code: '200', name: '仁愛區' }, { code: '201', name: '信義區' }, { code: '202', name: '中正區' },
    { code: '203', name: '中山區' }, { code: '204', name: '安樂區' }, { code: '205', name: '暖暖區' },
    { code: '206', name: '七堵區' }
  ],
  '新竹市': [
    { code: '300', name: '東　區' }, { code: '300', name: '北　區' }, { code: '300', name: '香山區' }
  ],
  '新竹縣': [
    { code: '302', name: '竹北市' }, { code: '303', name: '湖口鄉' }, { code: '304', name: '新豐鄉' },
    { code: '305', name: '新埔鎮' }, { code: '306', name: '關西鎮' }, { code: '307', name: '芎林鄉' },
    { code: '308', name: '寶山鄉' }, { code: '310', name: '竹東鎮' }, { code: '311', name: '五峰鄉' },
    { code: '312', name: '橫山鄉' }, { code: '313', name: '尖石鄉' }, { code: '314', name: '北埔鄉' },
    { code: '315', name: '峨眉鄉' }
  ],
  '苗栗縣': [
    { code: '350', name: '竹南鎮' }, { code: '351', name: '頭份市' }, { code: '352', name: '三灣鄉' },
    { code: '353', name: '南庄鄉' }, { code: '354', name: '獅潭鄉' }, { code: '356', name: '後龍鎮' },
    { code: '357', name: '通霄鎮' }, { code: '358', name: '苑裡鎮' }, { code: '360', name: '苗栗市' },
    { code: '361', name: '造橋鄉' }, { code: '362', name: '頭屋鄉' }, { code: '363', name: '公館鄉' },
    { code: '364', name: '大湖鄉' }, { code: '365', name: '泰安鄉' }, { code: '366', name: '銅鑼鄉' },
    { code: '367', name: '三義鄉' }, { code: '368', name: '西湖鄉' }, { code: '369', name: '卓蘭鎮' }
  ],
  '臺中市': [
    { code: '400', name: '中　區' }, { code: '401', name: '東　區' }, { code: '402', name: '南　區' },
    { code: '403', name: '西　區' }, { code: '404', name: '北　區' }, { code: '406', name: '北屯區' },
    { code: '407', name: '西屯區' }, { code: '408', name: '南屯區' }, { code: '411', name: '太平區' },
    { code: '412', name: '大里區' }, { code: '413', name: '霧峰區' }, { code: '414', name: '烏日區' },
    { code: '420', name: '豐原區' }, { code: '421', name: '后里區' }, { code: '422', name: '石岡區' },
    { code: '423', name: '東勢區' }, { code: '424', name: '和平區' }, { code: '426', name: '新社區' },
    { code: '427', name: '潭子區' }, { code: '428', name: '大雅區' }, { code: '429', name: '神岡區' },
    { code: '432', name: '大肚區' }, { code: '433', name: '沙鹿區' }, { code: '434', name: '龍井區' },
    { code: '435', name: '梧棲區' }, { code: '436', name: '清水區' }, { code: '437', name: '大甲區' },
    { code: '438', name: '外埔區' }, { code: '439', name: '大安區' }
  ],
  '彰化縣': [
    { code: '500', name: '彰化市' }, { code: '502', name: '芬園鄉' }, { code: '503', name: '花壇鄉' },
    { code: '504', name: '秀水鄉' }, { code: '505', name: '鹿港鎮' }, { code: '506', name: '福興鄉' },
    { code: '507', name: '線西鄉' }, { code: '508', name: '和美鎮' }, { code: '509', name: '伸港鄉' },
    { code: '510', name: '員林鎮' }, { code: '511', name: '社頭鄉' }, { code: '512', name: '永靖鄉' },
    { code: '513', name: '埔心鄉' }, { code: '514', name: '溪湖鎮' }, { code: '515', name: '大村鄉' },
    { code: '516', name: '埔鹽鄉' }, { code: '520', name: '田中鎮' }, { code: '521', name: '北斗鎮' },
    { code: '522', name: '田尾鄉' }, { code: '523', name: '埤頭鄉' }, { code: '524', name: '溪州鄉' },
    { code: '525', name: '竹塘鄉' }, { code: '526', name: '二林鎮' }, { code: '527', name: '大城鄉' },
    { code: '528', name: '芳苑鄉' }, { code: '530', name: '二水鄉' }
  ],
  '南投縣': [
    { code: '540', name: '南投市' }, { code: '541', name: '中寮鄉' }, { code: '542', name: '草屯鎮' },
    { code: '544', name: '國姓鄉' }, { code: '545', name: '埔里鎮' }, { code: '546', name: '仁愛鄉' },
    { code: '551', name: '名間鄉' }, { code: '552', name: '集集鎮' }, { code: '553', name: '水里鄉' },
    { code: '555', name: '魚池鄉' }, { code: '556', name: '信義鄉' }, { code: '557', name: '竹山鎮' },
    { code: '558', name: '鹿谷鄉' }
  ],
  '雲林縣': [
    { code: '630', name: '斗南鎮' }, { code: '631', name: '大埤鄉' }, { code: '632', name: '虎尾鎮' },
    { code: '633', name: '土庫鎮' }, { code: '634', name: '褒忠鄉' }, { code: '635', name: '東勢鄉' },
    { code: '636', name: '臺西鄉' }, { code: '637', name: '崙背鄉' }, { code: '638', name: '麥寮鄉' },
    { code: '640', name: '斗六市' }, { code: '643', name: '林內鄉' }, { code: '646', name: '古坑鄉' },
    { code: '647', name: '莿桐鄉' }, { code: '648', name: '西螺鎮' }, { code: '649', name: '二崙鄉' },
    { code: '651', name: '北港鎮' }, { code: '652', name: '水林鄉' }, { code: '653', name: '口湖鄉' },
    { code: '654', name: '四湖鄉' }, { code: '655', name: '元長鄉' }
  ],
  '嘉義市': [
    { code: '600', name: '東　區' }, { code: '600', name: '西　區' }
  ],
  '嘉義縣': [
    { code: '602', name: '番路鄉' }, { code: '603', name: '梅山鄉' }, { code: '604', name: '竹崎鄉' },
    { code: '605', name: '阿里山' }, { code: '606', name: '中埔鄉' }, { code: '607', name: '大埔鄉' },
    { code: '608', name: '水上鄉' }, { code: '611', name: '鹿草鄉' }, { code: '612', name: '太保市' },
    { code: '613', name: '朴子市' }, { code: '614', name: '東石鄉' }, { code: '615', name: '六腳鄉' },
    { code: '616', name: '新港鄉' }, { code: '621', name: '民雄鄉' }, { code: '622', name: '大林鎮' },
    { code: '623', name: '溪口鄉' }, { code: '624', name: '義竹鄉' }, { code: '625', name: '布袋鎮' }
  ],
  '臺南市': [
    { code: '700', name: '中西區' }, { code: '701', name: '東　區' }, { code: '702', name: '南　區' },
    { code: '704', name: '北　區' }, { code: '708', name: '安平區' }, { code: '709', name: '安南區' },
    { code: '710', name: '永康區' }, { code: '711', name: '歸仁區' }, { code: '712', name: '新化區' },
    { code: '713', name: '左鎮區' }, { code: '714', name: '玉井區' }, { code: '715', name: '楠西區' },
    { code: '716', name: '南化區' }, { code: '717', name: '仁德區' }, { code: '718', name: '關廟區' },
    { code: '719', name: '龍崎區' }, { code: '720', name: '官田區' }, { code: '721', name: '麻豆區' },
    { code: '722', name: '佳里區' }, { code: '723', name: '西港區' }, { code: '724', name: '七股區' },
    { code: '725', name: '將軍區' }, { code: '726', name: '學甲區' }, { code: '727', name: '北門區' },
    { code: '730', name: '新營區' }, { code: '731', name: '後壁區' }, { code: '732', name: '白河區' },
    { code: '733', name: '東山區' }, { code: '734', name: '六甲區' }, { code: '735', name: '下營區' },
    { code: '736', name: '柳營區' }, { code: '737', name: '鹽水區' }, { code: '741', name: '善化區' },
    { code: '742', name: '大內區' }, { code: '743', name: '山上區' }, { code: '744', name: '新市區' },
    { code: '745', name: '安定區' }
  ],
  '屏東縣': [
    { code: '900', name: '屏東市' }, { code: '901', name: '三地門' }, { code: '902', name: '霧臺鄉' },
    { code: '903', name: '瑪家鄉' }, { code: '904', name: '九如鄉' }, { code: '905', name: '里港鄉' },
    { code: '906', name: '高樹鄉' }, { code: '907', name: '鹽埔鄉' }, { code: '908', name: '長治鄉' },
    { code: '909', name: '麟洛鄉' }, { code: '911', name: '竹田鄉' }, { code: '912', name: '內埔鄉' },
    { code: '913', name: '萬丹鄉' }, { code: '920', name: '潮州鎮' }, { code: '921', name: '泰武鄉' },
    { code: '922', name: '來義鄉' }, { code: '923', name: '萬巒鄉' }, { code: '924', name: '崁頂鄉' },
    { code: '925', name: '新埤鄉' }, { code: '926', name: '南州鄉' }, { code: '927', name: '林邊鄉' },
    { code: '928', name: '東港鎮' }, { code: '929', name: '琉球鄉' }, { code: '931', name: '佳冬鄉' },
    { code: '932', name: '新園鄉' }, { code: '940', name: '枋寮鄉' }, { code: '941', name: '枋山鄉' },
    { code: '942', name: '春日鄉' }, { code: '943', name: '獅子鄉' }, { code: '944', name: '車城鄉' },
    { code: '945', name: '牡丹鄉' }, { code: '946', name: '恆春鎮' }, { code: '947', name: '滿州鄉' }
  ],
  '宜蘭縣': [
    { code: '260', name: '宜蘭市' }, { code: '261', name: '頭城鎮' }, { code: '262', name: '礁溪鄉' },
    { code: '263', name: '壯圍鄉' }, { code: '264', name: '員山鄉' }, { code: '265', name: '羅東鎮' },
    { code: '266', name: '三星鄉' }, { code: '267', name: '大同鄉' }, { code: '268', name: '五結鄉' },
    { code: '269', name: '冬山鄉' }, { code: '270', name: '蘇澳鎮' }, { code: '272', name: '南澳鄉' }
  ],
  '花蓮縣': [
    { code: '970', name: '花蓮市' }, { code: '971', name: '新城鄉' }, { code: '972', name: '秀林鄉' },
    { code: '973', name: '吉安鄉' }, { code: '974', name: '壽豐鄉' }, { code: '975', name: '鳳林鎮' },
    { code: '976', name: '光復鄉' }, { code: '977', name: '豐濱鄉' }, { code: '978', name: '瑞穗鄉' },
    { code: '979', name: '萬榮鄉' }, { code: '981', name: '玉里鎮' }, { code: '982', name: '卓溪鄉' },
    { code: '983', name: '富里鄉' }
  ],
  '臺東縣': [
    { code: '950', name: '臺東市' }, { code: '951', name: '綠島鄉' }, { code: '952', name: '蘭嶼鄉' },
    { code: '953', name: '延平鄉' }, { code: '954', name: '卑南鄉' }, { code: '955', name: '鹿野鄉' },
    { code: '956', name: '關山鎮' }, { code: '957', name: '海端鄉' }, { code: '958', name: '池上鄉' },
    { code: '959', name: '東河鄉' }, { code: '961', name: '成功鎮' }, { code: '962', name: '長濱鄉' },
    { code: '963', name: '太麻里' }, { code: '964', name: '金峰鄉' }, { code: '965', name: '大武鄉' },
    { code: '966', name: '達仁鄉' }
  ],
  '澎湖縣': [
    { code: '880', name: '馬公市' }, { code: '881', name: '西嶼鄉' }, { code: '882', name: '望安鄉' },
    { code: '883', name: '七美鄉' }, { code: '884', name: '白沙鄉' }, { code: '885', name: '湖西鄉' }
  ],
  '金門縣': [
    { code: '890', name: '金沙鎮' }, { code: '891', name: '金湖鎮' }, { code: '892', name: '金寧鄉' },
    { code: '893', name: '金城鎮' }, { code: '894', name: '烈嶼鄉' }, { code: '896', name: '烏坵鄉' }
  ],
  '連江縣': [
    { code: '209', name: '南竿鄉' }, { code: '210', name: '北竿鄉' }, { code: '211', name: '莒光鄉' },
    { code: '212', name: '東引鄉' }
  ]
};

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [activeStep, setActiveStep] = useState(2); // 預設在「填寫資料」
  const [selectedCity, setSelectedCity] = useState('');
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    zipCode: "",
    address: ""
  });

  const cities = Object.keys(postalCodeMap);
  const postalOptions = selectedCity ? postalCodeMap[selectedCity] : [];

  const subtotal =  location.state?.subtotal || 0;;
  const serviceFee =  location.state?.serviceFee || 0;;
  const total =  location.state?.total || 0;;

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setForm(prev => ({ ...prev, city: city, zipCode: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/orders", form, {
        withCredentials: true
      });
      setActiveStep(3); // Stepper 進入「完成訂單」
      Swal.fire({
        icon: "success",
        title: "訂單已送出！",
        confirmButtonText: "查看訂單"
      }).then(() => {
        navigate("/orders");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "訂單失敗",
        text: "請檢查資料是否正確"
      });
    }
  };

  return (
    <div className="mt-20">
      <Stepper activeStep={activeStep}/>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左側：填寫表單 */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">收件資訊</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">姓名</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">電話</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">縣市</label>
                <select name="city" value={selectedCity} onChange={handleCityChange} required className="w-full border px-3 py-2 rounded text-sm">
                  <option value="" disabled>請選擇</option>
                  {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">郵遞區號</label>
                <select name="zipCode" value={form.zipCode} onChange={handleChange} required disabled={!selectedCity} className="w-full border px-3 py-2 rounded text-sm">
                  <option value="">請選擇</option>
                  {postalOptions.map(opt => (
                    <option key={`${opt.code}-${opt.name}`} value={opt.code+opt.name}>{opt.code} {opt.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">詳細地址</label>
              <input name="address" value={form.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-sm" />
            </div>

            <button type="submit" className="w-full bg-[#7C9B75] hover:bg-[#6C8864] text-white py-2 rounded">
              送出訂單
            </button>
          </form>
        </div>

        {/* 右側：金額摘要 */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <h2 className="text-xl font-bold mb-4">訂單摘要</h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>小計</span><span>NT${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>服務費(5%)</span><span>NT${serviceFee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>總金額</span><span>NT${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
