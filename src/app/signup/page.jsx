import SignupForm from "@/components/SignupForm";
import AuthBanner from "@/components/AuthBanner";

const Page = () => {

    return (
        <div className='grid grid-cols-2 max-[1000px]:grid-cols-1 w-full'>
            <AuthBanner />
            <SignupForm />
        </div>
    )
}

export default Page