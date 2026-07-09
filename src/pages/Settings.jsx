import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="rounded-2xl border border-zinc-800 p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Appearance
            </h2>

            <p className="text-zinc-400 mt-1">
              Switch between light and dark mode.
            </p>
          </div>

          <button
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            className={`
              relative
              w-16
              h-9
              rounded-full
              transition-all
              ${
                isDark
                  ? "bg-violet-600"
                  : "bg-zinc-300"
              }
            `}
          >
            <div
              className={`
                absolute
                top-1
                left-1
                h-7
                w-7
                rounded-full
                bg-white
                shadow-md
                flex
                items-center
                justify-center
                transition-all
                ${
                  isDark
                    ? "translate-x-7"
                    : ""
                }
              `}
            >
              {isDark ? (
                <Moon size={14} />
              ) : (
                <Sun size={14} />
              )}
            </div>
          </button>

        </div>

      </div>

    </div>
  );
}