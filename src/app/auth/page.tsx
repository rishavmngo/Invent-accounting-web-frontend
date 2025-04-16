import LoginForm from "@/components/forms/loginForm.component";

export default function Auth() {
  return (
    <div className="grid grid-cols-[25%_75%] h-screen">
      <section className="">
        <div className="flex items-center h-full">
          <LoginForm />
        </div>
      </section>
      <section
        className="bg-stone-400   bg-no-repeat bg-center "
        style={{ backgroundImage: "url('/auth_hero_bg_lg.jpg')" }}
      >
        <div className="bg-green-10 h-full flex items-center justify-center ">
          <header className="text-white text-8xl font-bold leading-snug space-y-2 ">
            <h2>Accounting</h2>
            <h2>Made</h2>
            <h2>Easy</h2>
          </header>
        </div>
      </section>
    </div>
  );
}
