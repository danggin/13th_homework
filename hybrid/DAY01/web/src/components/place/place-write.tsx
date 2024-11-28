export default function PlaceWrite() {
  return (
    <form>
      <div>
        <label htmlFor="add-image">사진 등록</label>
        <input type="file" id="add-image" />
      </div>

      <div>
        <label htmlFor="write-name">플레이스 이름</label>
        <input type="text" id="write-name" />
      </div>

      <div>
        <label htmlFor="add-address">플레이스 주소</label>
        <input type="text" id="add-address" />
      </div>

      <div>
        <label htmlFor="write-content">플레이스 내용</label>
        <textarea
          id="write-content"
          placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
        ></textarea>
        <span>0/100</span>
      </div>
      <div>
        <button>로그 등록</button>
      </div>
    </form>
  );
}
