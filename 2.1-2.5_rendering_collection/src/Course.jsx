const Course = ({ courses }) => {

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <p>
            <strong>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>{' '}
          </p>
        </div>
      ))}
    </div>
  );
};


export default Course