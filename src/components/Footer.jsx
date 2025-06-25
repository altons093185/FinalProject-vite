function Footer() {

    return (
        <>
            {/* Footer */}
            <footer className="bg-[#7C9B75] text-white text-sm py-6 mt-12 w-full">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2025 好市快購 All rights reserved.</p>
                    <div className="flex gap-4 items-center">
                        <a href="" className="hover:text-white/80">關於我們</a>
                        <a href="" className="hover:text-white/80">常見問題</a>
                        <a href="" className="hover:text-white/80">聯絡客服</a>
                        {/* 社群 icon 可換成 svg 或圖片 */}
                        <a href="#" title="Facebook">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="fb" className="w-5 h-5" />
                        </a>
                        <a href="#" title="Instagram">
                            <img src="https://www.svgrepo.com/show/475658/instagram-color.svg" alt="ig" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );

}

export default Footer;



