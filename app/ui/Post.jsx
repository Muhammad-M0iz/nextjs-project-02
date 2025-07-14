import Link from "next/link";

export default function Post({title, body, id}) {
    return(
        <Link href={`/posts/${id}`} className="no-underline group h-full block">
            <div className="h-full p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
                    {title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow min-h-[4.5rem]">
                    {body.slice(0, 120)}...
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                        Read more
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                            Post #{id}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
} 
