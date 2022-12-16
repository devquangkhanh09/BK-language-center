export default function CourseStudentPage() {
  const name = localStorage.getItem("name");
  return `Welcome, ${name}`;
}
