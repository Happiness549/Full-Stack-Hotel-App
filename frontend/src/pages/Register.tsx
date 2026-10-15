
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
    const {signupForm, loading, error,success, } = useSelector((state: RootState) => state.user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updatedInputField({
            field: e.target.name as "name" | "surname"| "role" | "email" | "password"  | "cellNumber", 
            value: e.target.value
        })
    );
    };

    const handleSubmit = (e: FormEvent<HTMLElement>)=>{
        e.preventDefault();
        dispatch(AuthRegistration(signupForm))
    };


    return(
         <section className="h-screen w-full bg-[url('https://res.cloudinary.com/g1cepfbn/image/upload/v1792065964/Modern_Glass_House_with_Reflective_Pool.png')]  h-full w-full object-cover object-center">
        <Card className='bg-white/55 backdrop-blur-xl border border-white/40 shadow-xl p-8 w-150 ml-290'>
            <Text variant='h1' className='text-2xl'>Create your account </Text>
           

            <form className='mt-7 flex flex-col gap-8' onSubmit={handleSubmit}>
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
                label='Cell Number'
                type='number'
                name="cellNumber"
                value={signupForm.cellNumber}
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
                className='w-100 ml-9'/>
          
            <div className='flex ml-60'>
            <Text>Already have an account?</Text>
            <Text variant='p' className='text-[#0C5776]'><Link to='/login'>Login</Link></Text>

            </div>

            {error && (<Text variant='p'>{error}</Text>)}
            <button type='submit' disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
            </button>
            {success && (<Text variant='p'>{success}</Text>)}
       </form>
        </Card>

        </section>

    )
}