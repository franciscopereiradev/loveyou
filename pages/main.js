import styles from '../styles/Home.module.css'
import stylesTitleBar from '../styles/TitleBar.module.css'
import stylesContainer from '../styles/Container.module.css'
import Image from 'next/image'
import logo from '../public/logo.png'

export default function Home2() {
  return (
    <div className={stylesContainer.container}>
      <title>Love You</title>
      <div className={styles.header}>
        <div className={styles.logoBackground}></div>
        {/* <Image
          src={logo}
          alt={"Logo"}
          className={styles.logo}
        /> */}
      </div>
      <div className={styles.title}>
        <h1>Love You</h1>
        <div className={stylesTitleBar.titleBar1}></div>
        <div className={stylesTitleBar.titleBar2}></div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.loginBtn}>
          <button><a href='./login'>Login</a></button>
        </div>
        <div className={styles.registerBtn}>
          <button>
            <div>
              <a href='./register'>
                <h2>Sign-in</h2>
              </a>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}