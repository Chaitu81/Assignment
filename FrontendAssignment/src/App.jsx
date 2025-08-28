import { useState, useMemo, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// This is a comprehensive solution for the React component development assignment.
// It includes two main components: InputField and DataTable.
// The code is written in plain JavaScript/JSX and uses Tailwind CSS for styling.
// All components are self-contained within this single file for demonstration purposes.
// For a real-world project, you would place each component, story, and test in its own file.

// --- Helper Components & Hooks ---

// An example icon component for the InputField.
const EyeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.036a11.05 11.05 0 0 1 20.928 0m-20.928 0A11.05 11.05 0 0 0 12 21.036m-9.964-9.001C3.898 9.947 7.502 8.448 12 8.448s8.102 1.499 9.964 3.588m-9.964-9.001v.001m.002-.001a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM12 11.25a.75.75 0 1 0-.75.75H12a.75.75 0 0 0 .75-.75h-.75Z" />
  </svg>
);

const EyeSlashIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 18.981a10.233 10.233 0 0 1-1.077-2.651c-.139-.887-.202-1.807-.184-2.732.018-.925.109-1.84.272-2.735A11.05 11.05 0 0 1 12 3.75c1.474.004 2.92.203 4.316.593m-1.745 1.15c.677 1.408 1.05 2.927 1.05 4.512a8.623 8.623 0 0 1-.951 4.417M2.036 12.036a11.05 11.05 0 0 1 20.928 0m-20.928 0A11.05 11.05 0 0 0 12 21.036m-9.964-9.001c.189 1.42.545 2.801 1.054 4.14M12 11.25a.75.75 0 1 0-.75.75.75.75 0 0 0 .75-.75ZM12 11.25h.001" />
  </svg>
);

// --- Component 1: InputField ---

const InputField = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClear = false,
}) => {
  // State for password visibility toggle
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Ref for the input element to focus it after clear
  const inputRef = useRef(null);

  // Clear button click handler
  const handleClear = () => {
    if (onChange) {
      // Create a mock event object to pass to the onChange handler
      const e = {
        target: {
          value: '',
        }
      };
      onChange(e);
    }
    // Focus the input element after clearing
    inputRef.current?.focus();
  };

  // Determine base input styling based on variant, size, and state
  const baseClasses = `
    w-full block appearance-none transition-colors duration-200 focus:outline-none
    rounded-md border border-transparent
    peer bg-white dark:bg-zinc-800 dark:border-zinc-700
  `;

  // Determine size-specific classes
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  }[size];

  // Determine variant and state-specific classes
  const variantClasses = {
    outlined: `
      border-2 border-fuchsia-300 dark:border-fuchsia-700
      ${invalid ? 'border-red-500 dark:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
      ${disabled ? 'bg-slate-100 text-slate-400 dark:bg-zinc-700 dark:text-zinc-500' : 'bg-white dark:bg-zinc-900'}
    `,
    filled: `
      bg-fuchsia-100 dark:bg-fuchsia-900/50
      ${invalid ? 'border-red-500 dark:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
      ${disabled ? 'text-slate-400 dark:text-zinc-500' : 'text-slate-800 dark:text-zinc-200'}
    `,
    ghost: `
      bg-transparent
      ${invalid ? 'border-red-500 dark:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
      ${disabled ? 'text-slate-400 dark:text-zinc-500' : 'text-slate-800 dark:text-zinc-200'}
    `,
  }[variant];

  return (
    <div className="flex flex-col mb-6 space-y-1 w-full max-w-sm">
      {label && (
        <label
          htmlFor="input-field"
          className={`
            text-base font-semibold text-fuchsia-800 dark:text-fuchsia-300
            ${disabled ? 'text-fuchsia-400 dark:text-fuchsia-500' : ''}
          `}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id="input-field"
          ref={inputRef}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${variantClasses} ${sizeClasses} pr-10`}
          aria-invalid={invalid}
          aria-describedby={errorMessage ? 'error-message' : helperText ? 'helper-text' : undefined}
          aria-label={label || placeholder || 'Input field'}
        />
        {(value && showClear && !disabled && !invalid) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-fuchsia-400 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-200 transition-colors duration-200"
            aria-label="Clear input"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-fuchsia-400 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-200 transition-colors duration-200"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {errorMessage && invalid ? (
        <span id="error-message" className="text-red-500 text-sm font-medium">
          {errorMessage}
        </span>
      ) : (
        helperText && (
          <span id="helper-text" className="text-fuchsia-500 dark:text-fuchsia-400 text-sm">
            {helperText}
          </span>
        )
      )}
    </div>
  );
};

// --- Component 2: DataTable ---

const DataTable = ({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Use a memoized sorted data to prevent re-sorting on every render
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return data;
    }
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortColumn, sortDirection]);

  // Handle row selection
  const handleRowSelection = (row) => {
    const isSelected = selectedRows.includes(row);
    let newSelectedRows;
    if (isSelected) {
      newSelectedRows = selectedRows.filter(r => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle column sorting
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Render the table content
  const renderTableContent = () => {
    if (loading) {
      return (
        <tr className="bg-fuchsia-50 dark:bg-fuchsia-900/10">
          <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-10 text-center text-fuchsia-500 dark:text-fuchsia-400">
            Loading data...
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr className="bg-fuchsia-50 dark:bg-fuchsia-900/10">
          <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-10 text-center text-fuchsia-500 dark:text-fuchsia-400">
            No data available.
          </td>
        </tr>
      );
    }

    return sortedData.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`border-b dark:border-fuchsia-700 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/20 transition-colors duration-200 ${selectedRows.includes(row) ? 'bg-fuchsia-200/50 dark:bg-fuchsia-800/50' : ''}`}
        aria-selected={selectable && selectedRows.includes(row)}
      >
        {selectable && (
          <td className="p-4 text-center">
            <input
              type="checkbox"
              checked={selectedRows.includes(row)}
              onChange={() => handleRowSelection(row)}
              className="form-checkbox h-4 w-4 text-fuchsia-600 rounded-sm border-fuchsia-300 dark:border-fuchsia-500 bg-white dark:bg-zinc-700 cursor-pointer"
              aria-label={`Select row ${rowIndex}`}
            />
          </td>
        )}
        {columns.map((column) => (
          <td
            key={column.key}
            className="p-4 text-sm text-fuchsia-800 dark:text-fuchsia-300 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {column.render ? column.render(row[column.dataIndex], row) : String(row[column.dataIndex])}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-sm border border-fuchsia-200 dark:border-fuchsia-700">
      <table className="min-w-full divide-y divide-fuchsia-200 dark:divide-fuchsia-700 bg-white dark:bg-zinc-900">
        <thead className="bg-fuchsia-100 dark:bg-fuchsia-900/20">
          <tr>
            {selectable && (
              <th scope="col" className="p-4 text-left text-xs font-semibold text-fuchsia-500 dark:text-fuchsia-400 uppercase tracking-wider">
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`p-4 text-left text-xs font-semibold text-fuchsia-500 dark:text-fuchsia-400 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800 transition-colors duration-200' : ''}`}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
                aria-sort={sortColumn === column.dataIndex ? sortDirection || 'none' : 'none'}
              >
                <div className="flex items-center space-x-2">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <span className="text-fuchsia-400 dark:text-fuchsia-500">
                      {sortColumn === column.dataIndex ? (
                        sortDirection === 'asc' ? '▲' : '▼'
                      ) : (
                        '↕'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-fuchsia-200 dark:divide-fuchsia-700">
          {renderTableContent()}
        </tbody>
      </table>
    </div>
  );
};

// --- Main Application / Demo ---

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  // Simple validation logic
  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setIsFormInvalid(true);
    } else {
      setPasswordError('');
      setIsFormInvalid(false);
    }
  }, [password]);

  // Dummy data for the DataTable component
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Peter Jones', email: 'peter@example.com', role: 'Manager' },
    { id: 4, name: 'Sarah Lee', email: 'sarah@example.com', role: 'Analyst' },
  ];

  const userColumns = [
    { key: 'name', title: 'Full Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email Address', dataIndex: 'email' },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ];

  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-indigo-100 dark:from-zinc-900 dark:to-slate-900 text-fuchsia-900 dark:text-zinc-200 font-sans p-12">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-fuchsia-900 dark:text-white drop-shadow-md">
        React Components Showcase
      </h1>
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-start">
        {/* InputField Demo Section */}
        <div className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-8 border-t-4 border-fuchsia-500 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4 text-fuchsia-900 dark:text-fuchsia-100">InputField Component Demo</h2>
          <InputField
            label="Name"
            placeholder="Enter your name"
            helperText="This is your public display name."
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="md"
            variant="outlined"
            showClear
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="md"
            variant="filled"
            disabled
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="md"
            variant="outlined"
            invalid={isFormInvalid}
            errorMessage={passwordError}
          />
        </div>

        {/* DataTable Demo Section */}
        <div className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-2xl w-full max-w-4xl space-y-8 border-t-4 border-fuchsia-500 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4 text-fuchsia-900 dark:text-fuchsia-100">DataTable Component Demo</h2>
          <DataTable
            data={userData}
            columns={userColumns}
            selectable
            onRowSelect={setSelectedUsers}
          />
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-fuchsia-800 dark:text-fuchsia-200">Selected Rows:</h3>
            <ul className="list-disc list-inside mt-2">
              {selectedUsers.length > 0 ? (
                selectedUsers.map((user) => <li key={user.id}>{user.name}</li>)
              ) : (
                <li>No rows selected.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;