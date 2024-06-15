import { TodoItem } from "@/lib/types";
import { Pen, Trash } from "lucide-react";
import React from "react";

function TodoList({ items }: { items: TodoItem[] }) {
  return (
    <div>
      {items.length !== 0 ? (
        <div className="flex flex-col gap-1">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row flex-wrap items-center gap-3 lg:justify-between justify-center w-full py-3"
              >
                <div className="card bg-neutral shadow-xl flex-1 lg:w-[80%] w-full">
                  <div className="card-body py-4 break-words">
                    <p>{item.title}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-square btn-outline basis-*">
                    <Pen />
                  </button>
                  <button className="btn btn-square btn-outline basis-*">
                    <Trash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>No items</>
      )}
    </div>
  );
}

export default TodoList;
