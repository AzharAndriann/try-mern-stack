import Image from "next/image"

const Card = () => {
  return (
    <div className="max-w-sm border border-gray-200 rounded-md shadow">
      <div className="relative">
        <div className="reltive aspect-video">
          <Image src={} alt="" fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-m object-cover"/>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-gray-900 truncate">title</h1>
        </div>
        <div className="flex items-center justify-between">
          
        </div>
      </div>
    </div>
  )
}

export default Card