import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import ProfilePanel from '@/features/Profile/UI/ProfilePanel'
import AuthGuardProvider from '@/app/providers/AuthGuardProvider'

const Profile = () => {
    return (
        <Wrapper>
            <AuthGuardProvider>
                <ProfilePanel />
            </AuthGuardProvider>
        </Wrapper>
    )
}

export default Profile
