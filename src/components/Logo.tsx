import Image from 'next/image'
import logo from '@/images/logos/logo-medium.png'
export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <div className="flex items-center gap-2">
      <Image src={logo} alt="Logo" width={28} height={28} />
      <h2 className="text-h2">Smingle</h2>
    </div>
  )
}
