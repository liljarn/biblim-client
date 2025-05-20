import {UserLabel} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

interface UserInfoProps {
    self: boolean;
    userId: string;
    avatarUrl: string;
    name: string;
}

export const UserInfo = ({self, userId, avatarUrl, name}: UserInfoProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (self) {
            navigate('/cabinet');
        } else {
            navigate(`/user/${userId}`);
        }
    };

    return (
        <div onClick={handleClick}>
            <UserLabel type="person" avatar={avatarUrl}>
                {name}
            </UserLabel>
        </div>
    );
};
