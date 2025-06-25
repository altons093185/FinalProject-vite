import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  { id: 1, name: "購物車", path: "/cart" },
  { id: 2, name: "填寫資料", path: "/checkout" },
  { id: 3, name: "完成訂單", path: "/order-success" }
];

function Stepper({ activeStep = null }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const currentStepIndex = steps.findIndex(step => step.path === currentPath);

  // 若父層有傳 activeStep，優先使用
  const stepIndex = activeStep !== null ? activeStep - 1 : currentStepIndex;

  const activeColor = "#7C9B75";
  const completedColor = "#7C9B75";
  const pendingColor = "#e0e0e0";

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-6 rounded px-6 py-4">
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const isActive = index === stepIndex;
          const isCompleted = index < stepIndex;
          const isClickable = index === 0 && stepIndex !== 0;

          return (
            <div
              key={step.id}
              className={`text-center ${
                isClickable ? "cursor-pointer hover:bg-[#e0e0e0]" : "cursor-default"
              }`}
              onClick={() => {
                if (isClickable) navigate(step.path);
              }}
            >
              <div
                className="h-1 rounded mb-2"
                style={{
                  backgroundColor: isActive || isCompleted ? activeColor : pendingColor
                }}
              ></div>

              <div className="text-xs text-[#6D6763] mb-1">Step {step.id}</div>
              <div
                className={`font-semibold ${
                  isActive ? "text-[#7C9B75]" : isCompleted ? "text-[#7C9B75]" : "text-gray-400"
                }`}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;
