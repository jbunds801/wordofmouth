import ShowCard from './ShowCard'
import type { Show } from '@/types/show'

const EditDeleteShowCard = ({ show }: { show: Show }) => {
    return (
        <div>
            <ShowCard {...show} />
        </div>
    );
};

export default EditDeleteShowCard;