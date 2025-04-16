import Link from 'next/link';
export default function Home() {
  return (
    <div className="container">
      <h1>♻️ AI Upcycle Platform</h1>
      <nav>
        <Link href="/upload">Upload Garment</Link>
        <Link href="/tailors">Find Tailors</Link>
      </nav>
    </div>
  );
}
