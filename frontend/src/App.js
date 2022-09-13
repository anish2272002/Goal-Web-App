import React, { useState, useEffect } from 'react';

import GoalInput from './components/goals/GoalInput';
import CourseGoals from './components/goals/CourseGoals';
import ErrorAlert from './components/UI/ErrorAlert';

const backendUrl = process.env.NODE_ENV === 'development'?'http://localhost:8000/':'http://ec2-43-205-130-154.ap-south-1.compute.amazonaws.com/';

function App() {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(backendUrl);

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.detail || 'Fetching the goals failed.');
        }

        setLoadedGoals(resData);
      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.detail || 'Adding the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = [
          {
            id: resData.id,
            text: goalText,
          },
          ...prevGoals,
        ];
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);

    try {
      const response = await fetch(backendUrl+ goalId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.detail || 'Deleting the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      {error && <ErrorAlert errorText={error} />}
      <GoalInput onAddGoal={addGoalHandler} />
      {!isLoading && (
        <CourseGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
      )}
    </React.Fragment>
  );
}

export default App;
