import LoginForm from "@/components/LoginForm";
import ShineBorder from "@/components/ui/shineBorder";

export default function Login() {
  return (
    <main className="h-screen">
      <div className="flex items-center justify-center lg:flex-row flex-col h-full gap-10 lg:gap-0">
        <div className="flex lg:w-1/2 items-center lg:h-screen">
          <ShineBorder
            className="text-center text-2xl font-bold capitalize"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            ToDo Application
          </ShineBorder>
        </div>
        <div className="flex items-center lg:h-screen">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
