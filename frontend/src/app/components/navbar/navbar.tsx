import Image from "next/image";
import Link from "next/link";
function navbar() {
  return (
    <nav>
      <Link href={"/"}>
        <Image alt="Logo" src="/images/logo.png" width={50} height={50} />
      </Link>
      <Link href={"/"}>
        <h1>Report</h1>
      </Link>
    </nav>)
}

export default navbar
