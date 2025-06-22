#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

#define MAX_TASKS 100
#define SIMULATION_TIME 30 // Total simulation time

typedef struct {
    int id;
    int period;
    int burst;
    int next_release;
    int deadline;
    int remaining;
    int executions;
    int missedDeadlines; 
} Task;

Task tasks[MAX_TASKS];
int numTasks;
int currentTime = 0;
pthread_mutex_t lock;

void *scheduler(void *arg);
void sortTasksByPeriod();
void printTaskStats();

int main() {
    pthread_t schedulerThread;

    printf("Enter number of tasks: ");
    scanf("%d", &numTasks);

    for (int i = 0; i < numTasks; i++) {
        tasks[i].id = i + 1;
        printf("Enter period and burst time for Task %d: ", i + 1);
        scanf("%d %d", &tasks[i].period, &tasks[i].burst);
        tasks[i].next_release = 0;
        tasks[i].deadline = tasks[i].period;
        tasks[i].remaining = 0;
        tasks[i].executions = 0;
        tasks[i].missedDeadlines = 0; 
    }

    sortTasksByPeriod();
    pthread_mutex_init(&lock, NULL);
    pthread_create(&schedulerThread, NULL, scheduler, NULL);
    pthread_join(schedulerThread, NULL);
    pthread_mutex_destroy(&lock);
    printTaskStats();

    return 0;
}

void *scheduler(void *arg) {
    while (currentTime < SIMULATION_TIME) {
        pthread_mutex_lock(&lock);

        // Release new jobs if it's time
        for (int i = 0; i < numTasks; i++) {
            if (currentTime == tasks[i].next_release) {
                if (tasks[i].remaining > 0) {
                    printf("Time %2d: Task P%d missed its deadline (was due at %d)\n",
                           currentTime, tasks[i].id, tasks[i].deadline);
                    tasks[i].missedDeadlines++; 
                    tasks[i].remaining = 0;     // Drop current job
                }
                tasks[i].remaining = tasks[i].burst;
                tasks[i].next_release += tasks[i].period;
                tasks[i].deadline = currentTime + tasks[i].period;
            }
        }

        // Find task with earliest deadline
        int selected = -1;
        int min_deadline = __INT_MAX__;
        for (int i = 0; i < numTasks; i++) {
            if (tasks[i].remaining > 0 && tasks[i].deadline < min_deadline) {
                selected = i;
                min_deadline = tasks[i].deadline;
            }
        }

        // Execute selected task
        if (selected != -1) {
            printf("Time %2d: Task P%d is running (Deadline: %d)\n",
                   currentTime, tasks[selected].id, tasks[selected].deadline);
            tasks[selected].remaining--;
            if (tasks[selected].remaining == 0) {
                printf("Time %2d: Task P%d completed\n", currentTime + 1, tasks[selected].id);
                tasks[selected].executions++;
            }
        } else {
            printf("Time %2d: CPU is idle\n", currentTime);
        }

        pthread_mutex_unlock(&lock);
        sleep(1);
        currentTime++;
    }
    return NULL;
}

void sortTasksByPeriod() {
    for (int i = 0; i < numTasks - 1; i++) {
        for (int j = 0; j < numTasks - i - 1; j++) {
            if (tasks[j].period > tasks[j + 1].period) {
                Task temp = tasks[j];
                tasks[j] = tasks[j + 1];
                tasks[j + 1] = temp;
            }
        }
    }
}

void printTaskStats() {
    printf("\nTask Summary:\n");
    printf("ID\tPeriod\tBurst\tExecutions\tMissed Deadlines\n");
    for (int i = 0; i < numTasks; i++) {
        printf("P%d\t%d\t%d\t%d\t\t%d\n",
               tasks[i].id,
               tasks[i].period,
               tasks[i].burst,
               tasks[i].executions,
               tasks[i].missedDeadlines);
    }
}
