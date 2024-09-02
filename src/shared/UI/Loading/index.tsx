import Loader from '../Loader'
import styles from './styles.module.scss'

const Loading = () => {
    return (
        <div className={styles.loading}>
            <Loader />
        </div>
    )
}

export default Loading
