import SigninForm from "@/components/SigninForm";
import AuthBanner from "@/components/AuthBanner";
const page = () => {

    return (
        <div className='grid grid-cols-2 max-[1000px]:grid-cols-1 w-full bg-white dark:bg-white'>
            <AuthBanner />
            <SigninForm />
        </div>
    )
}

export default page