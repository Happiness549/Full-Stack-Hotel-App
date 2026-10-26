
import {Text} from '../components/ui/Text'
 import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { updatedInputField, AuthRegistration } from '../redux/RegisterSlice'
import type{ ChangeEvent, FormEvent } from 'react'
import type { RootState, AppDispatch } from '../store'
import {Link} from 'react-router-dom'
import {Card } from '../components/ui/Card'


export const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {signupForm, error,success, } = useSelector((state: RootState) => state.user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updatedInputField({
            // field: e.target.name as "name" | "surname"| "role" | "email" | "password"  | "phone",  
            field: e.target.name as keyof typeof signupForm,
            value: e.target.value 
        })
    );
    };

    const handleSubmit = (e: FormEvent<HTMLElement>)=>{
        e.preventDefault();
        dispatch(AuthRegistration(signupForm))
    };


    return(
        <>
       
         <div className="h-screen w-full bg-[url('https://res.cloudinary.com/g1cepfbn/image/upload/v1792433478/Bright_Scandinavian_Open-Plan_Interior_1.png')] bg-cover   bg-center bg-no-repeat ">
         <div className='flex ml-10 absolute mt-10'>
             <Text variant={'h1'} className='text-[#7E9E85] font-bold text-3xl'>Stay</Text>
             <Text variant={'h1'} className='text-white font-bold text-3xl'>Clear</Text>      
         </div>
        
        <Card className='bg-white/40 shadow-xl backdrop-blur-sm border border-white/50 h-150  p-8 w-120 ml-200 absolute mt-15'>
            <Text variant='h1' className='text-sm text-center font-bold'>Create your account </Text>
           

            <form className='mt-7 flex flex-col gap-5' onSubmit={handleSubmit}>
                <Input
                
                label='Name'
                type='text'
                name='name'
                value={signupForm.name}
                onChange= {handleChange}
                placeholder='Enter your name'
                />

                <Input
                
                label='Surname'
                type='text'
                name='surname'
                value={signupForm.surname}
                onChange= {handleChange}
                placeholder='Enter surname'
                />


                <Input
                
                label='Role'
                type='text'
                name='role'
                value={signupForm.role}
                onChange= {handleChange}
                placeholder='Enter surname'
                />

                <Input
                label='Phone Number'
                type='number'
                name="phone"
                value={signupForm.phone}
                onChange= {handleChange}
                placeholder='Enter phone number'
                /> 

                
                <Input
                label='Email'
                type='text'
                name='email'
                value={signupForm.email}
                onChange= {handleChange}
                placeholder='Enter email'
                />
                
                <Input
                label='Password'
                type='text'
                name='password'
                value={signupForm.password}
                onChange= {handleChange}
                placeholder='password'
                />
                
                
                
                <Button text='Create Account'
                className='w-80 '/>
          
            <div className='flex gap-5'>
            <Text className='text-sm'>Already have an account?</Text>
            <Text variant='p' className='text-[#0C5776] text-sm'><Link to='/login'>Login</Link></Text>

            </div>

            {error && (<Text variant='p'>{error}</Text>)}
            {success && (<Text variant='p'>{success}</Text>)}
       </form>
        </Card>

        </div>
        </>

    )
}