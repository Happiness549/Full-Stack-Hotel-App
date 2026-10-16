import {Text} from '../components/ui/Text'
import {Card} from '../components/ui/Card'
import {Button} from '../components/ui/Button'


export const Admin = () =>{


    return(
        <>
          <Button
            text={'Logout'}
            className=''
            />
        <Card>
            <Text variant={'h1'}>Checkin todya</Text>
        </Card>

        </>
    )
}