import { useEffect, useState } from "react";
import "./Workspace.css";

function Workspace() {
  const [scripts, setScripts] = useState({});
  const [activeScript, setActiveScript] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    newCategory: "",
    text: "",
  });
  const [editing, setEditing] = useState(null); // id редактируемого скрипта

  // Загружаем из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("scripts");
    if (saved) {
      setScripts(JSON.parse(saved));
    } else {
      const initial = {
        greeting: {
          title: "Приветствие",
          text: "Здравствуйте! Меня зовут [Имя]...",
          category: "Приветствие",
        },
        support: {
          title: "Поддержка",
          text: "Могу ли я узнать, в чём заключается проблема?",
          category: "Возражения",
        },
      };
      setScripts(initial);
      localStorage.setItem("scripts", JSON.stringify(initial));
    }
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("scripts", JSON.stringify(scripts));

    // обновляем категории
    const cats = new Set(
      Object.values(scripts).map((s) => s.category).filter(Boolean)
    );
    setCategories([...cats].sort());
  }, [scripts]);

  // Добавление скрипта
  const handleAddScript = (e) => {
    e.preventDefault();

    const key = "script_" + Date.now();
    const category =
      formData.category === "__custom__"
        ? formData.newCategory.trim()
        : formData.category;

    if (!formData.title.trim() || !formData.text.trim() || !category) return;

    setScripts((prev) => ({
      ...prev,
      [key]: {
        title: formData.title.trim(),
        text: formData.text.trim(),
        category,
      },
    }));

    setFormData({ title: "", category: "", newCategory: "", text: "" });
  };

  // Удаление
  const handleDelete = (key) => {
    if (window.confirm(`Удалить скрипт "${scripts[key].title}"?`)) {
      const updated = { ...scripts };
      delete updated[key];
      setScripts(updated);
      if (activeScript === key) setActiveScript(null);
    }
  };

  // Сохранение редактирования
  const handleEditSave = (e, key) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const text = form.text.value.trim();

    setScripts((prev) => ({
      ...prev,
      [key]: { ...prev[key], title, text },
    }));

    setEditing(null);
  };

  // Группировка скриптов по категориям
  const grouped = {};
  Object.entries(scripts).forEach(([key, script]) => {
    if (!grouped[script.category]) grouped[script.category] = [];
    grouped[script.category].push({ key, ...script });
  });

  return (
    <div className="wrapper">
      {/* Список слева */}
      <div className="sidebar-left">
        <h2>Скрипты</h2>
        <div>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3>{category}</h3>
              {items.map(({ key, title }) => (
                <div
                  key={key}
                  className={`script-item ${activeScript === key ? "active" : ""
                    }`}
                >
                  <button
                    className="script-button"
                    onClick={() => setActiveScript(key)}
                  >
                    {title}
                  </button>
                  <div className="actions">
                    <button onClick={() => setEditing(key)}>✎</button>
                    <button onClick={() => handleDelete(key)}>✕</button>
                  </div>
                  {editing === key && (
                    <form
                      onSubmit={(e) => handleEditSave(e, key)}
                      className="edit-form"
                    >
                      <input
                        type="text"
                        name="title"
                        defaultValue={scripts[key].title}
                        required
                      />
                      <textarea
                        name="text"
                        defaultValue={scripts[key].text}
                        rows="4"
                        required
                      />
                      <button type="submit">💾 Сохранить</button>
                      <button type="button" onClick={() => setEditing(null)}>
                        Отмена
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Контент */}
      <div className="content">
        {activeScript ? (
          <>
            <div className="script-title">
              {scripts[activeScript]?.title}
            </div>
            <div className="script-text">{scripts[activeScript]?.text}</div>
          </>
        ) : (
          <p>Выберите скрипт...</p>
        )}
      </div>

      {/* Правая панель */}
      <div className="sidebar-right">
        <h2>Новый скрипт</h2>
        <form onSubmit={handleAddScript}>
          <input
            type="text"
            placeholder="Название"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((f) => ({ ...f, title: e.target.value }))
            }
          />

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((f) => ({ ...f, category: e.target.value }))
            }
            required
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="__custom__">Другая...</option>
          </select>

          {formData.category === "__custom__" && (
            <input
              type="text"
              placeholder="Новая категория"
              required
              value={formData.newCategory}
              onChange={(e) =>
                setFormData((f) => ({ ...f, newCategory: e.target.value }))
              }
            />
          )}

          <textarea
            placeholder="Текст скрипта"
            rows="10"
            required
            value={formData.text}
            onChange={(e) =>
              setFormData((f) => ({ ...f, text: e.target.value }))
            }
          ></textarea>

          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default Workspace;
