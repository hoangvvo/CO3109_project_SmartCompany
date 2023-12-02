import imageBg from "@/assets/vertical-skyscrappers-shot.jpg";
import Logo from "@/components/view/logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1 min-w-0 hidden lg:flex text-zinc-200 bg-zinc-900 overflow-hidden relative">
        <Image
          src={imageBg}
          layout="fill"
          objectFit="cover"
          alt=""
          className="opacity-10 blur-sm"
        />
        <div className="flex h-screen flex-col justify-between p-12 relative z-10">
          <Logo />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This product transforms device management in companies,
                automating and analyzing everything from air conditioners to
                lights. It&apos;s not just smart, it&apos;s a revolution in
                efficiency.&rdquo;
              </p>
              <footer className="text-sm">Elon Musk</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
