# Workspace

---

### 1. Подключаем хуки и стили

```jsx
import { useEffect, useState } from "react";
import "./Workspace.css";
```

* `useState` — для хранения данных (списки скриптов, активный скрипт и т.п.).
* `useEffect` — для загрузки/сохранения в `localStorage`.
* `Workspace.css` — твой файл стилей.

---

### 2. Состояния компонента

```jsx
const [scripts, setScripts] = useState({});
const [activeScript, setActiveScript] = useState(null);
const [categories, setCategories] = useState([]);
const [formData, setFormData] = useState({
  title: "",
  category: "",
  newCategory: "",
  text: "",
});
const [editing, setEditing] = useState(null);
```

* `scripts` — объект с твоими скриптами (ключ → объект с title, text, category).
* `activeScript` — id выбранного скрипта, который показывается в центре.
* `categories` — список категорий для `<select>`.
* `formData` — данные формы «Добавить скрипт».
* `editing` — id скрипта, который сейчас редактируем. Если `null`, редактирования нет.

---

### 3. Загрузка из `localStorage`

```jsx
useEffect(() => {
  const saved = localStorage.getItem("scripts");
  if (saved) {
    setScripts(JSON.parse(saved));
  } else {
    const initial = {
      greeting: { ... },
      support: { ... },
    };
    setScripts(initial);
    localStorage.setItem("scripts", JSON.stringify(initial));
  }
}, []);
```

* Этот `useEffect` запускается **один раз** при загрузке страницы (`[]`).
* Если в `localStorage` уже есть скрипты → загружаем.
* Если нет → кладём туда дефолтные.

---

### 4. Автосохранение

```jsx
useEffect(() => {
  localStorage.setItem("scripts", JSON.stringify(scripts));

  const cats = new Set(
    Object.values(scripts).map((s) => s.category).filter(Boolean)
  );
  setCategories([...cats].sort());
}, [scripts]);
```

* Каждый раз, когда меняется `scripts`, мы:

  1. сохраняем их в `localStorage`;
  2. пересчитываем список категорий (`Set` нужен, чтобы убрать дубли).

---

### 5. Добавление нового скрипта

```jsx
const handleAddScript = (e) => {
  e.preventDefault();

  const key = "script_" + Date.now();
  const category =
    formData.category === "__custom__"
      ? formData.newCategory.trim()
      : formData.category;

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
```

* `Date.now()` генерит уникальный ключ.
* Если пользователь выбрал «Другая…» → берём из `newCategory`.
* `setScripts` добавляет новый скрипт в список.
* После добавления очищаем форму.

---

### 6. Удаление

```jsx
const handleDelete = (key) => {
  if (window.confirm(`Удалить скрипт "${scripts[key].title}"?`)) {
    const updated = { ...scripts };
    delete updated[key];
    setScripts(updated);
    if (activeScript === key) setActiveScript(null);
  }
};
```

* Спрашиваем подтверждение.
* Копируем объект скриптов, удаляем выбранный.
* Если удалили активный — сбрасываем `activeScript`.

---

### 7. Редактирование

```jsx
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
```

* Берём данные из формы редактирования.
* Обновляем скрипт в `scripts`.
* Сбрасываем `editing`, чтобы закрыть форму.

---

### 8. Группировка скриптов по категориям

```jsx
const grouped = {};
Object.entries(scripts).forEach(([key, script]) => {
  if (!grouped[script.category]) grouped[script.category] = [];
  grouped[script.category].push({ key, ...script });
});
```

* Превращаем `scripts` в структуру вида:

```js
{
  "Приветствие": [ { key, title, text, category }, ... ],
  "Возражения": [ ... ]
}
```

* Это нужно, чтобы красиво отрисовать скрипты по категориям.

---

### 9. Рендеринг JSX

```jsx
<div className="wrapper">
  {/* Список слева */}
  <div className="sidebar-left">
    {Object.entries(grouped).map(([category, items]) => (
      <div key={category}>
        <h3>{category}</h3>
        {items.map(({ key, title }) => (
          <div key={key} className={`script-item ${activeScript === key ? "active" : ""}`}>
            <button onClick={() => setActiveScript(key)}>{title}</button>
            <div className="actions">
              <button onClick={() => setEditing(key)}>✎</button>
              <button onClick={() => handleDelete(key)}>✕</button>
            </div>
            {editing === key && (
              <form onSubmit={(e) => handleEditSave(e, key)}>
                <input name="title" defaultValue={scripts[key].title} />
                <textarea name="text" defaultValue={scripts[key].text}></textarea>
                <button type="submit">💾</button>
                <button type="button" onClick={() => setEditing(null)}>Отмена</button>
              </form>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
```

* Отрисовываем категории и скрипты.
* Если скрипт выбран → подсвечиваем (`active`).
* Если скрипт редактируется → показываем форму.

---

### 10. Контент (по центру)

```jsx
<div className="content">
  {activeScript ? (
    <>
      <div className="script-title">{scripts[activeScript]?.title}</div>
      <div className="script-text">{scripts[activeScript]?.text}</div>
    </>
  ) : (
    <p>Выберите скрипт...</p>
  )}
</div>
```

* Если есть выбранный скрипт → показываем его.
* Если нет → пишем «Выберите скрипт…».

---

### 11. Форма добавления (справа)

```jsx
<div className="sidebar-right">
  <form onSubmit={handleAddScript}>
    <input
      type="text"
      placeholder="Название"
      value={formData.title}
      onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
    />
    <select
      value={formData.category}
      onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
    >
      <option value="" disabled>Выберите категорию</option>
      {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      <option value="__custom__">Другая...</option>
    </select>
    {formData.category === "__custom__" && (
      <input
        type="text"
        placeholder="Новая категория"
        value={formData.newCategory}
        onChange={(e) => setFormData((f) => ({ ...f, newCategory: e.target.value }))}
      />
    )}
    <textarea
      placeholder="Текст скрипта"
      value={formData.text}
      onChange={(e) => setFormData((f) => ({ ...f, text: e.target.value }))}
    ></textarea>
    <button type="submit">Добавить</button>
  </form>
</div>
```

* Управляемая форма (`value` + `onChange` → синхронизация с `formData`).
* Если выбрали `"__custom__"` → показываем дополнительное поле для новой категории.
* При `submit` → вызываем `handleAddScript`.

---

✅ В итоге у тебя получился компонент, который:

* хранит скрипты в `localStorage`;
* умеет добавлять, редактировать, удалять;
* автоматически обновляет категории;
* рендерит всё через React, без ручного DOM.

---

Хочешь, я тебе сделаю картинку (схему) как связаны состояния (`scripts`, `categories`, `activeScript`, `formData`) и как они влияют на разные части интерфейса?
