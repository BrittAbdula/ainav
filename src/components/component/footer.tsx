
export default function Footer() {

    return (
        <footer className="bg-white text-zinc-900 py-8">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4">
                <div>
                    <div className="select-none flex items-center">
                        <div className="mr-2"><img alt="Tailsc Logo" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" src="/logo.svg" /></div>
                        <div className="text-xl __className_3ac6c1">Tailsc</div>
                    </div>
                </div>
                <p className="text-base text-center text-zinc-500 mx-auto max-w-2xl">Get started over 100+ UI components, sections and pages built with Tailwind CSS.</p>
                <ul className="flex flex-1 min-w-0 justify-center items-center gap-8">
                    <li><a className="text-zinc-900 hover:text-blue-500" href="#">Home</a></li>
                    <li><a className="text-zinc-900 hover:text-blue-500" href="#">Product</a></li>
                    <li><a className="text-zinc-900 hover:text-blue-500" href="#">Blog</a></li>
                    <li><a className="text-zinc-900 hover:text-blue-500" href="#">About</a></li>
                    <li><a className="text-zinc-900 hover:text-blue-500" href="#">Contact</a></li>
                </ul>
                <div className="text-sm text-zinc-500 text-center">© 2024 Tailsc. All Rights Reserved.</div>
            </div>
        </footer>
    )
}