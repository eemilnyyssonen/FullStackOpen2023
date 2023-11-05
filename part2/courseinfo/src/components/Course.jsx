const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part
                key={part.id}
                part={part}
            />
        )}
    </>

const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total sum={course.parts.map(part => part.exercises)
                        .reduce((tot, cur) => tot + cur)} />
                </div>
            )}
        </>
    )
}

export default Course