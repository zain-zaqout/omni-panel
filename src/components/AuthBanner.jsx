import { Settings, ShoppingCart, TrendingUp, Users2 } from 'lucide-react'

const AuthBanner = () => {
    return (
        <div className='max-[1000px]:hidden min-w-1/2 h-screen bg-violet-600 px-15 py-10 flex'>
            <div className='flex flex-col justify-between max-w-[85%]'>

                <div className='flex items-center gap-2'>
                    <div className='bg-white w-8.25 h-8.25 rounded-xl flex items-center justify-center'>
                        <Settings className='text-violet-600 w-5.5 h-5.5' />
                    </div>
                    <span className='text-xl font-bold text-white'>
                        <span className='text-violet-300'>
                            Omni
                        </span>
                        Panel
                    </span>
                </div>

                <div>
                    <h1 className='text-gray-50 text-3xl font-bold max-w-3/4 max-[1150px]:max-w-full'>Manage your store, all in one place.</h1>
                    <p className='text-sm text-gray-300 pt-3'>Track revenue, orders, inventory and customers from a single, modern dashboard built for growing e-commerce teams.</p>
                    <div className='flex flex-col space-y-3 mt-4'>

                        <div className='w-full px-5 py-3.5 flex items-center justify-between border border-slate-400 rounded-[18px] bg-violet-400/30'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-violet-400/60 rounded-xl w-9.5 h-9.5 flex items-center justify-center'>
                                    <TrendingUp className='w-4 h-4 text-white' />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='text-gray-300 text-xs'>Total Revenue</h3>
                                    <span className='text-lg font-bold text-white'>$124,592</span>
                                </div>
                            </div>
                            <div className='bg-violet-400/50 text-xs text-white rounded-full font-medium flex items-center justify-center h-6 w-fit px-2'>
                                +12.5%
                            </div>
                        </div>

                        <div className='w-full px-5 py-3.5 flex items-center justify-between border border-slate-400 rounded-[18px] bg-violet-400/30'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-violet-400/60 rounded-xl w-9.5 h-9.5 flex items-center justify-center'>
                                    <Users2 className='w-4 h-4 text-white' />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='text-gray-300 text-xs'>Active Users</h3>
                                    <span className='text-lg font-bold text-white'>14,203</span>
                                </div>
                            </div>
                            <div className='bg-violet-400/50 text-xs text-white rounded-full font-medium flex items-center justify-center h-6 w-fit px-2'>
                                +5.2%
                            </div>
                        </div>

                        <div className='w-full px-5 py-3.5 flex items-center justify-between border border-slate-400 rounded-[18px] bg-violet-400/30'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-violet-400/50 rounded-xl w-9.5 h-9.5 flex items-center justify-center'>
                                    <ShoppingCart className='w-4 h-4 text-white' />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='text-gray-300 text-xs'>New Orders</h3>
                                    <span className='text-lg font-bold text-white'>1,492</span>
                                </div>
                            </div>
                            <div className='bg-violet-400/50 text-xs text-white rounded-full font-medium flex items-center justify-center h-6 w-fit px-2'>
                                +8.1%
                            </div>
                        </div>
                    </div>
                </div>

                <p className='text-xs text-gray-300'>Designed & built by Zain | {new Date().getFullYear()}</p>

            </div>
        </div>
    )
}

export default AuthBanner