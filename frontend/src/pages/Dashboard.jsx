import { useEffect, useReact } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import { goals, isLoading, isError, message } from "../features/goals/goalSlice";
import Spinner from '../components/Spinner';
import { reset, getGoals } from "../features/goals/goalSlice";
import GoalItem from '../components/GoalItem';


const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate('/login');
        }

        dispatch(getGoals());
        return () => {
            dispatch(reset()); // when unmount clear the goals
        }

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h2>Welcome { user && user.name}</h2>
            <p>Goals Dashboard</p>
        </section>
        <GoalForm />
        <div className="content">
            {goals.length > 0 ? ( 
                <div className='goals'>
                    {goals.map((goal) => (
                        <GoalItem key={goal._id} goal={goal} />
                    ))}
                </div>
            ) : (<h2>You have not set any goals !</h2>)}
        </div>
    </>
  );
}

export default Dashboard;