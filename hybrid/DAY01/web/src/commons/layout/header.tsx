import Image from "next/image";
import iconBack from "../../../public/images/icon-back.svg";

export default function Header() {
  return (
    <header className="flex gap-2 items-center h-[48px]">
      <button>
        <Image
          src={iconBack}
          width={0}
          height={0}
          sizes="100vw"
          alt="뒤로 가기"
        />
      </button>
      <h2>플레이스 등록</h2>
    </header>
  );
}
