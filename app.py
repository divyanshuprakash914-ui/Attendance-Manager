import requests
import datetime
import math

# ================== CONFIG ==================

BASE_URL = "https://my.newtonschool.co"
# Zexpwi8F = "Zexpwi8F"

# BEARER_TOKEN = "Z88wdmYVLW70v2bstLU9j9FjvwgW29"#(Samriddhi)
# BEARER_TOKEN = "FpDyIyzTU0jfYyBqE6HsKxuLZYRnkN" #(Apish)
# BEARER_TOKEN = "gYydMJTDrJhTLAwQXBb1PiJ8IxrbpF" #(self)
# BEARER_TOKEN = "ysJqsiXzpq8AQzj1qVYjE9kdJ2Ig10" #(Rithull)

BEARER_TOKEN = "MXQUagJ6pheDH22qComvCkuK9AC3Ey"   # Vani
# BEARER_TOKEN = "kaCvJKNgq5EK5Z4dC2ueDKL7318xkn" #(shukla)
# BEARER_TOKEN = "BUyvOAab2zjgHshoKKBsgBIkQoqh3e" #(Bhurpreet)






OVERALL_COURSE_HASH = "c6ootz3nd2y8"
ALERT_THRESHOLD = 77.0  
LEAVE_TARGET = 77.0    

COURSES = {
    "chemistry": {
        "label": "Applied Chem",
        "path": "/api/v2/course/h/x63irurahd7y/self_performance/",
    },
    "chemistry_lab": {
        "label": "Applied Chem Lab 2",
        "path": "/api/v2/course/h/w2cnsqrqs2wf/self_performance/",
    },
    "english": {
        "label": "English",
        "path": "/api/v2/course/h/zenm76zyjzil/self_performance/",
    },
    "math": {
        "label": "Prob. & Stat.",
        "path": "/api/v2/course/h/yulq4tu1cfrl/self_performance/",
    },
    "math_lab": {
        "label": "P&S Lab 2",
        "path": "/api/v2/course/h/nn8gcpgrlwja/self_performance/",
    },
    "dsa": {
        "label": "DSA",
        "path": "/api/v2/course/h/lpy9ubdndi3h/self_performance/",
    },
    "dsa_lab": {
        "label": "DSA Lab 2",
        "path": "/api/v2/course/h/d1ro0r1vpauy/self_performance/",
    },
    "wap": {
        "label": "WAP",
        "path": "/api/v2/course/h/ba5zr8ljtuei/self_performance/",
    },
    "wap_lab": {
        "label": "WAP Lab 2",
        "path": "/api/v2/course/h/zxlg4e35f37w/self_performance/",
    },
    "india_constitution": {
        "label": "India constitution 2",
        "path": "/api/v2/course/h/yse2mx5tr8et/self_performance/",
    },
    "yoga": {
        "label": "YOGA 2",
        "path": "/api/v2/course/h/h3spjcl21sbo/self_performance/",
    },
}


GROUPS = {
    "Math + Math Lab": ["math", "math_lab"],
    "WAP + WAP Lab": ["wap", "wap_lab"],
    "Applied Chemistry + Lab": ["chemistry", "chemistry_lab"],
    "DSA + DSA Lab": ["dsa", "dsa_lab"],
    "Yoga": ["yoga"],
}


TIMETABLE = {
    "monday": [
        "math",
        "dsa",
        "india_constitution",
        "chemistry_lab",
        "math_lab",
    ],
    "tuesday": [
        "chemistry",
        "dsa",
        "yoga",
        "wap_lab",
        "english",
    ],
    "wednesday": [
        "dsa",
        "math",
        "dsa_lab",
        "math_lab",
        "chemistry_lab",
    ],
    "thursday": [
        "dsa",
        "chemistry",
        "wap_lab",
        "yoga",
        "dsa_lab",
    ],
    "friday": [
        "yoga",
    ],
}


# TIMETABLE = {
#     "monday": [
#         "math",
#         "wap",
#         "india_constitution",
#         "math_lab",
#         "wap_lab",
#     ],
#     "tuesday": [
#         "chemistry",
#         "dsa",
#         "yoga",
#         "chemistry_lab",
#         "english",
#     ],
#     "wednesday": [
#         "wap",
#         "math",
#         "wap_lab",
#         "dsa_lab",
#         "math_lab",
#     ],
#     "thursday": [
#         "dsa",
#         "chemistry",
#         "dsa_lab",
#         "yoga",
#         "chemistry_lab",
#     ],
#     "friday": [
#         "yoga",
#     ],
# }


WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"]


# ================== CORE UTILS ==================

def get_headers(token):
    return {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }


def get_json(url, token):
    try:
        response = requests.get(url, headers=get_headers(token), timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"[ERROR] {url} -> Status {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"[ERROR] Request failed for {url}: {e}")
        return None


def get_attendance_for_course(course_key, token):
    course = COURSES[course_key]
    url = BASE_URL + course["path"]
    data = get_json(url, token)
    if not data:
        return None

    return {
        "total": data.get("total_lectures", 0),
        "attended": data.get("total_lectures_attended", 0),
    }


def get_overall_attendance(token):
    url = f"{BASE_URL}/api/v2/course/h/{OVERALL_COURSE_HASH}/self_performance/"
    data = get_json(url, token)
    if not data:
        return None

    return {
        "total": data.get("total_lectures", 0),
        "attended": data.get("total_lectures_attended", 0),
    }


def calc_percentage(attended, total):
    if total == 0:
        return 0.0
    return (attended / float(total)) * 100.0


def classes_needed_to_reach(attended, total, target_percent):
    target = target_percent / 100.0

    if total == 0:
        return 0

    current = calc_percentage(attended, total)

    if current >= target_percent:
        return 0

    x = (target * total - attended) / (1 - target)
    return math.ceil(x)


def max_bunks_allowed(attended, total, target_percent):
    target = target_percent / 100.0

    if total == 0:
        return 0

    current = calc_percentage(attended, total)

    if current < target_percent:
        return 0

    # attended / (total + x) >= target
    x = (attended / target) - total
    return max(0, int(x))



def print_attendance_row(name, attended, total):
    percent = calc_percentage(attended, total)
    print(f"{name:<30} {attended:>3}/{total:<3}  ({percent:6.2f}%)")


def get_academic_today_tomorrow(now):
    """
    Returns (today_name, tomorrow_name) for Mon-Fri.
    If it's Saturday or Sunday, today_name = None, tomorrow_name = 'monday'.
    """
    weekday_idx = now.weekday()  # 0=Mon ... 6=Sun

    if weekday_idx >= 5:  # Sat/Sun
        return None, WEEKDAYS[0]  # (None, 'monday')

    today_name = WEEKDAYS[weekday_idx]

    if weekday_idx == 4:  # Friday -> next academic = Monday
        tomorrow_name = WEEKDAYS[0]
    else:
        tomorrow_name = WEEKDAYS[weekday_idx + 1]

    return today_name, tomorrow_name


def get_num_classes(day_name):
    if not day_name:
        return 0
    return len(TIMETABLE.get(day_name.lower(), []))

def complete_attendence(attend_class):
    if calc_percentage(attend_class["attended"], attend_class["total"]) < 77:
        print("Leave not possible")

    


# ================== SIMULATION & REPORT ==================

def simulate_leave_for_day(day_name, overall_att, per_course_attendance):
    """
    Simulate: you take leave and miss ALL classes on given day.
    We assume each class = 1 lecture.
    """
    day_name = (day_name or "").lower()
    classes = TIMETABLE.get(day_name, [])

    missed_count = len(classes)

    # New overall totals
    new_overall_total = overall_att["total"] + missed_count
    new_overall_attended = overall_att["attended"] # you attend none of them

    # New per-course attendance
    new_per_course = {}
    for key, data in per_course_attendance.items():
        new_per_course[key] = {
            "total": data["total"],
            "attended": data["attended"],
        }

    for course_key in classes:
        if course_key in new_per_course:
            new_per_course[course_key]["total"] += 1
        # If a course is in timetable but missing from API, we can't adjust it.

    return {
        "overall": {
            "total": new_overall_total,
            "attended": new_overall_attended,
        },
        "per_course": new_per_course,
        "missed_lectures": missed_count,
    }


# def simulate_day_present(day_name, overall_att):
#     """
#     Simulate: you attend ALL classes on that day.
#     This only affects overall attendance in this function.
#     """
#     n = get_num_classes(day_name)
#     new_total = overall_att["total"] + n
#     new_attended = overall_att["attended"] + n
#     return {
#         "total": new_total,
#         "attended": new_attended,
#         "classes": n,
#     }

def simulate_day_present(day_name, overall_att, per_course_attendance):
    """
    Simulate: you attend ALL classes on given day.
    """
    day_name = (day_name or "").lower()
    classes = TIMETABLE.get(day_name, [])

    attended_count = len(classes)

    new_total = overall_att["total"] + attended_count
    new_attended = overall_att["attended"] + attended_count

    return {
        "total": new_total,
        "attended": new_attended,
        "classes": attended_count,
    }


def simulate_one_class_leave(day_name, overall_att):
    """
    You attend all classes of that day EXCEPT one.
    So: total += n, attended += (n - 1)
    """
    n = get_num_classes(day_name)
    if n <= 0:
        return {
            "total": overall_att["total"],
            "attended": overall_att["attended"],
            "classes": 0,
        }
    new_total = overall_att["total"] + n
    new_attended = overall_att["attended"] + (n - 1)
    return {
        "total": new_total,
        "attended": new_attended,
        "classes": n,
    }


def build_alerts(classes_day_name, per_course_attendance):
    alerts = []
    classes_day_name = (classes_day_name or "").lower()
    classes_on_day = TIMETABLE.get(classes_day_name, [])

    for course_key in classes_on_day:
        data = per_course_attendance.get(course_key)
        if not data:
            continue
        pct = calc_percentage(data["attended"], data["total"])
        if pct < ALERT_THRESHOLD:
            alerts.append((course_key, pct))

    return alerts


def suggest_best_leave_day(overall_att, per_course_attendance):
    current_pct = calc_percentage(overall_att["attended"], overall_att["total"])
    best_day = None
    best_pct = -1.0
    best_is_safe = False  # whether >= LEAVE_TARGET

    day_results = []

    for day_name in WEEKDAYS:
        sim = simulate_leave_for_day(day_name, overall_att, per_course_attendance)
        sim_overall = sim["overall"]
        sim_pct = calc_percentage(sim_overall["attended"], sim_overall["total"])
        delta = sim_pct - current_pct

        day_results.append((day_name, sim_pct, delta, sim["missed_lectures"]))

        is_safe = sim_pct >= LEAVE_TARGET

        if is_safe:
            if not best_is_safe or sim_pct > best_pct:
                best_day = day_name
                best_pct = sim_pct
                best_is_safe = True
        else:
            if not best_is_safe and sim_pct > best_pct:
                best_day = day_name
                best_pct = sim_pct
                best_is_safe = False

    return best_day, best_pct, current_pct, day_results


# ================== MAIN ==================

def main():
    token = BEARER_TOKEN.strip()
    if not token:
        token = input("Enter your Bearer token: ").strip()

    now = datetime.datetime.now()
    hour = now.hour

    today_name, tomorrow_name = get_academic_today_tomorrow(now)

    print("\n===== TIME & DAY INFO =====")
    print(f"System time: {now}")
    if today_name:
        print(f"Today (academic):   {today_name.capitalize()}")
    else:
        print("Today (academic):   Weekend (no fixed classes)")
    print(f"Next academic day: {tomorrow_name.capitalize()}")

    print("\n===== FETCHING ATTENDANCE DATA =====")
    overall = get_overall_attendance(token)
    if not overall:
        print("Could not fetch overall attendance. Exiting.")
        return

    per_course_attendance = {}
    missing_from_api = []

    for key in COURSES:
        data = get_attendance_for_course(key, token)
        if data:
            per_course_attendance[key] = data
        else:
            missing_from_api.append(COURSES[key]["label"])

    # --------- CURRENT REPORT ---------
    print("\n===== CURRENT OVERALL ATTENDANCE =====")
    print_attendance_row("Overall", overall["attended"], overall["total"])
    needed_overall = classes_needed_to_reach(
    overall["attended"], overall["total"], ALERT_THRESHOLD
)

    max_bunk_overall = max_bunks_allowed(
        overall["attended"], overall["total"], ALERT_THRESHOLD
    )

    if needed_overall > 0:
        print(f"   ➤ Need {needed_overall} consecutive classes to reach {ALERT_THRESHOLD}%")
    else:
        print(f"   ➤ You can bunk {max_bunk_overall} more classes safely")

    print("\n===== ATTENDANCE BY SUBJECT =====")
    for key, course in COURSES.items():
        data = per_course_attendance.get(key)
        if data:
            print_attendance_row(course["label"], data["attended"], data["total"])

            attended = data["attended"]
            total = data["total"]
            pct = calc_percentage(attended, total)

            needed = classes_needed_to_reach(attended, total, ALERT_THRESHOLD)
            max_bunk = max_bunks_allowed(attended, total, ALERT_THRESHOLD)

            if pct < ALERT_THRESHOLD:
                print(f"   ➤ Need to attend {needed} classes to reach {ALERT_THRESHOLD}%")
            else:
                print(f"   ➤ Can bunk {max_bunk} classes safely")
        else:
            print(f"{course['label']:<30}  --/--   (no data from API)")

    print("\n===== GROUPED ATTENDANCE =====")
    for group_name, course_keys in GROUPS.items():
        total_lectures = 0
        total_attended = 0
        for key in course_keys:
            data = per_course_attendance.get(key)
            if data:
                total_lectures += data["total"]
                total_attended += data["attended"]
        print_attendance_row(group_name, total_attended, total_lectures)

    if missing_from_api:
        print("\n===== SUBJECTS MISSING FROM API (USED IN GROUPS/TIMETABLE) =====")
        for name in missing_from_api:
            print(f"- {name}")

    # --------- ALERTS FOR NEXT CLASS DAY ---------
    print("\n===== ALERTS (LOW ATTENDANCE & NEXT CLASS DAY) =====")

    # If it's very late/early (e.g., 1:04 AM), use TODAY for alerts.
    if today_name and hour < 6:
        alerts_day = today_name
        label = "today"
    else:
        alerts_day = tomorrow_name
        label = "next day"

    print(f"Checking day: {alerts_day.capitalize()} ({label})")
    alerts = build_alerts(alerts_day, per_course_attendance)
    if not alerts:
        print("No alerts. You are safe for that day based on current data.")
    else:
        for course_key, pct in alerts:
            label_subj = COURSES[course_key]["label"]
            print(f"- {label_subj}: {pct:.2f}% and class on {alerts_day.capitalize()} -> ATTEND ⚠")

    # --------- DAILY SCENARIOS (FULL-DAY LEAVES) ---------
    print("\n===== DAILY LEAVE SCENARIOS (BASED ON TIME) =====")

    # Between 9 and 18 -> show both:
    # 1) Today full absent
    # 2) Today full present + Tomorrow full absent
    if today_name and 9 <= hour < 18:
        # Scenario 1: Today full absent
        sim_today_absent = simulate_leave_for_day(today_name, overall, per_course_attendance)
        overall_today_absent = sim_today_absent["overall"]

        # Scenario 2: Today full present + tomorrow full absent (overall-only math)
        pres_today = simulate_day_present(today_name, overall, per_course_attendance)
        # Now apply "tomorrow full absent" on top of that:
        overall_tmp = {
            "total": pres_today["total"],
            "attended": pres_today["attended"],
        }
        sim_tmr_absent_from_tmp = simulate_leave_for_day(tomorrow_name, overall_tmp, per_course_attendance)
        overall_today_pres_tmr_absent = sim_tmr_absent_from_tmp["overall"]

        print(f"Time window: {hour}:00 -> treating it as class hours (Today + Tomorrow scenarios).")
        print(f"\n[Scenario A] {today_name.capitalize()} FULL ABSENT")
        print("Current overall: ", end="")
        print_attendance_row("Now", overall["attended"], overall["total"])
        print("After leave:     ", end="")
        print_attendance_row(
            f"{today_name.capitalize()} Absent",
            overall_today_absent["attended"],
            overall_today_absent["total"],
        )

        print(f"\n[Scenario B] {today_name.capitalize()} FULL PRESENT + {tomorrow_name.capitalize()} FULL ABSENT")
        print("Current overall: ", end="")
        print_attendance_row("Now", overall["attended"], overall["total"])
        print("If today present & tomorrow absent: ", end="")
        print_attendance_row(
            "Today P, Tmr A",
            overall_today_pres_tmr_absent["attended"],
            overall_today_pres_tmr_absent["total"],
        )
    else:
        # Outside 9–18 -> only consider a single “reference day” for full leave
        if today_name and hour < 18:
            ref_day = today_name
            label = "today"
        else:
            ref_day = tomorrow_name
            label = "tomorrow"

        sim_ref = simulate_leave_for_day(ref_day, overall, per_course_attendance)
        overall_ref = sim_ref["overall"]
        print(f"Time window: {hour}:00 -> showing single-day leave scenario for {label} ({ref_day.capitalize()}).")
        print("Current overall: ", end="")
        print_attendance_row("Now", overall["attended"], overall["total"])
        print(f"If {label} FULL ABSENT: ", end="")
        print_attendance_row(
            f"{ref_day.capitalize()} Absent",
            overall_ref["attended"],
            overall_ref["total"],
        )

    # --------- ONE-CLASS LEAVE SCENARIO ---------
    print("\n===== ONE-CLASS LEAVE SCENARIO =====")
    # If time < 18 -> today, else -> tomorrow
    if today_name and hour < 18:
        one_class_day = today_name
        label = "today"
    else:
        one_class_day = tomorrow_name
        label = "tomorrow"

    baseline = simulate_day_present(one_class_day, overall, per_course_attendance)
    one_leave = simulate_one_class_leave(one_class_day, overall)

    print(f"Assuming planning for {label} ({one_class_day.capitalize()}).")
    print(f"Total classes that day (from timetable): {baseline['classes']}")

    if baseline["classes"] == 0:
        print("No classes that day in timetable, so one-class leave has no effect.")
    else:
        print("\nIf you attend ALL classes that day:")
        print_attendance_row(
            "All present",
            baseline["attended"],
            baseline["total"],
        )

        print(f"\nIf you take LEAVE for 1 class (and attend the rest) on that day:")
        print_attendance_row(
            "Leave 1 class",
            one_leave["attended"],
            one_leave["total"],
        )

    # --------- BEST DAY (MON–FRI) TO TAKE ONE FULL-DAY LEAVE ---------
    print("\n===== BEST DAY (MON–FRI) TO TAKE ONE FULL-DAY LEAVE =====")
    best_day, best_pct, current_pct, day_results = suggest_best_leave_day(
        overall, per_course_attendance
    )

    print(f"Current overall: {current_pct:.2f}%")
    print("\nDay-wise impact if you skip that day once:")
    for day_name in WEEKDAYS:
        for d_name, sim_pct, delta, missed_lectures in day_results:
            if d_name == day_name:
                print(
                    f"- {day_name.capitalize():<10}: "
                    f"{sim_pct:6.2f}%  (Δ {delta:+6.2f}%)  | lectures missed: {missed_lectures}"
                )
                break

    if best_day:
        if best_day == "friday":
            yoga_data = per_course_attendance.get("yoga")

            if yoga_data:
                yoga_pct = calc_percentage(yoga_data["attended"], yoga_data["total"])

                if yoga_pct > 77:
                    print(
                        f"\nSuggested day to take leave (purely by least damage to overall "
                        f"and target {LEAVE_TARGET:.0f}%): {best_day.capitalize()} "
                        f"-> {best_pct:.2f}% overall."
                    )
                else:
                    print(
                        f"\nSuggested day to take leave (purely by least damage to overall) "
                        f"\nALERT -> Low attendance in Yoga: {yoga_pct:.2f}%!!! "
                        f"Suggestion: do not leave the Yoga class. "
                        f"Target {LEAVE_TARGET:.0f}%: {best_day.capitalize()} "
                        f"-> {best_pct:.2f}% overall."
                    )
            else:
                print("\nCould not check Yoga attendance because Yoga data is missing from API.")
        else:
            print(
                f"\nSuggested day to take leave (purely by least damage to overall "
                f"and target {LEAVE_TARGET:.0f}%): {best_day.capitalize()} "
                f"-> {best_pct:.2f}% overall."
            )
    else:
        print("\nCould not determine a best day (no data).")

    print("\n===== END OF REPORT =====\n")


if __name__ == "__main__":
    main()