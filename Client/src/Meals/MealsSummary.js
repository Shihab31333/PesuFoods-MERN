import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
      "Choose your canteen and discover amazing flavors!
        Every meal is prepared with love,
         ensuring a cozy and inviting space."
      </p>
    </section>
  );
};

export default MealsSummary;