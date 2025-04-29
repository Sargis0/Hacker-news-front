import styles from "./Input.module.scss"

export const Input = ({...props}) => {
    return <input className={styles.input} {...props}/>
};
