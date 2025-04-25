import styles from "./Input.module.scss"

export const Input = ({...props}) => {
    return <input type="text" className={styles.input} {...props}/>
};
