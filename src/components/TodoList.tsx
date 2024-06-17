import { TodoItem } from "@/lib/types";
import classNames from "classnames";
import { Check, Pen, Trash, X } from "lucide-react";
import React, { SetStateAction } from "react";

function TodoList({
  items,
  setItems,
}: {
  items: TodoItem[];
  setItems: React.Dispatch<SetStateAction<TodoItem[]>>;
}) {
  const handleDeleteItem = (todo: TodoItem) => {
    console.log(todo);
    items = items.filter(function (item) {
      return item !== todo;
    });
    setItems(items);
  };
  const toggleItemComplete = (todo: TodoItem) => {
    items = items.filter(function (item) {
      if (item == todo) item.is_completed = !item.is_completed;
      return item;
    });
    console.log(items);
    setItems(items);
  };
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
                <div
                  className={classNames(
                    "card shadow-xl flex-1 lg:w-[80%] w-full",
                    { "bg-green-700": item.is_completed },
                    { "bg-neutral": !item.is_completed },
                  )}
                >
                  <div className="card-body py-4 break-words">
                    <p>{item.title}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="tooltip"
                    data-tip={
                      item.is_completed
                        ? "Mark as incomplete"
                        : "Mark as completed"
                    }
                  >
                    <button className="btn btn-square btn-outline basis-*">
                      {item.is_completed ? (
                        <X
                          onClick={() => {
                            toggleItemComplete(item);
                          }}
                        />
                      ) : (
                        <Check
                          onClick={() => {
                            toggleItemComplete(item);
                          }}
                        />
                      )}
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete Item">
                    <button className="btn btn-square btn-outline basis-*">
                      <Trash
                        onClick={() => {
                          handleDeleteItem(item);
                        }}
                      />
                    </button>
                  </div>
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
