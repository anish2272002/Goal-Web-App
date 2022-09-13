import { useState } from 'react';

import './GoalInput.css';
import Card from '../UI/Card';

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  function updateGoalTextHandler(event) {
    setEnteredGoalText(event.target.value);
  }

  function goalSubmitHandler(event) {
    event.preventDefault();

    if (enteredGoalText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddGoal(enteredGoalText);

    setEnteredGoalText('');
  }

  return (
    <section id='goal-input'>
      <Card>
        <form onSubmit={goalSubmitHandler}>
          <label className="form-label" htmlFor='text'><h3>New Goal</h3></label>
          <input
            type='text'
            id='text'
            value={enteredGoalText}
            onChange={updateGoalTextHandler}
            className="form-control my-2"
          />
          <button className="btn btn-lg btn-success">Add Goal</button>
        </form>
      </Card>
    </section>
  );
}

export default GoalInput;
