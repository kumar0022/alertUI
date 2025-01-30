import React from 'react'
// import Danieli from './Danieli2'
// import Custom_logic from './Custom_logic'
import Danieli from './Danile2'

function HomePage() {
    return (
        <div>
            {/* Header */}
            <header className="text-center py-6 bg-gray-800 text-white flex items-center justify-between px-6">
                <h1 className="text-3xl">DANIELI AUTOMATION</h1>
                <p className="text-xl">Bar and Rod Mill</p>
            </header>
            {/* <div>
                <Custom_logic />
            </div> */}
            <div>
                <Danieli />
            </div>


        </div>
    )
}

export default HomePage
