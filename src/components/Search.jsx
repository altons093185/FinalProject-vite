

function Search(){
               

return (

    <form className="flex gap-2 mb-4 max-w-6xl mx-auto">
                <input
                  className="flex-1 p-2 border rounded"
                  type="search"
                  placeholder="輸入關鍵字或商品編號"
                />
                <button className="bg-[#7C9B75] hover:bg-[#6C8864] text-white px-4 rounded">
                  搜尋
                </button>
              </form>
);
}

export default Search;