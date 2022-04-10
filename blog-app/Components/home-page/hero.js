import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/kuldeep" alt="An image showing kuldeep" width={300} height={300} />
            </div>
            <h1>Hi I'm Kuldeep</h1>
            <p>
                I'm a Fullstack Developer
            </p>
        </section>
    );
}

export default Hero;