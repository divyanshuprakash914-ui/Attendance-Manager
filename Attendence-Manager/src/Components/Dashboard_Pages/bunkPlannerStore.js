import { useEffect, useState } from "react";

export const BUNK_PLANNER_STORAGE_KEY = "attendease_bunk_plans";
export const BUNK_PLANNER_UPDATE_EVENT = "attendease-bunk-plans-updated";

const EMPTY_STATE = {
  confirmed: [],
  buffers: [],
};

function sanitizeState(value) {
  if (!value || typeof value !== "object") {
    return EMPTY_STATE;
  }

  return {
    confirmed: Array.isArray(value.confirmed) ? value.confirmed : [],
    buffers: Array.isArray(value.buffers) ? value.buffers : [],
  };
}

export function getStoredBunkPlannerState() {
  if (typeof window === "undefined") {
    return EMPTY_STATE;
  }

  try {
    const raw = window.localStorage.getItem(BUNK_PLANNER_STORAGE_KEY);
    return raw ? sanitizeState(JSON.parse(raw)) : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

function saveStoredBunkPlannerState(nextState) {
  if (typeof window === "undefined") {
    return;
  }

  const sanitized = sanitizeState(nextState);

  try {
    window.localStorage.setItem(BUNK_PLANNER_STORAGE_KEY, JSON.stringify(sanitized));
    window.dispatchEvent(new CustomEvent(BUNK_PLANNER_UPDATE_EVENT, { detail: sanitized }));
  } catch {
    return;
  }
}

function upsertBySignature(collection, record) {
  const items = Array.isArray(collection) ? collection : [];
  const nextItems = items.filter((item) => item.signature !== record.signature);
  return [record, ...nextItems].slice(0, 24);
}

export function saveConfirmedBunkRecord(record) {
  const current = getStoredBunkPlannerState();

  saveStoredBunkPlannerState({
    confirmed: upsertBySignature(current.confirmed, record),
    buffers: (current.buffers || []).filter((item) => item.signature !== record.signature),
  });
}

export function saveBufferedBunkRecord(record) {
  const current = getStoredBunkPlannerState();

  saveStoredBunkPlannerState({
    ...current,
    buffers: upsertBySignature(current.buffers, record),
  });
}

export function subscribeToBunkPlannerState(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleUpdate(event) {
    callback(event.detail || getStoredBunkPlannerState());
  }

  function handleStorage(event) {
    if (event.key === BUNK_PLANNER_STORAGE_KEY) {
      callback(getStoredBunkPlannerState());
    }
  }

  window.addEventListener(BUNK_PLANNER_UPDATE_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(BUNK_PLANNER_UPDATE_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useBunkPlannerStore() {
  const [state, setState] = useState(() => getStoredBunkPlannerState());

  useEffect(() => subscribeToBunkPlannerState(setState), []);

  return state;
}
