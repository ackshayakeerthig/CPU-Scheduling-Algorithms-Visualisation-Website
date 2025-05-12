#include <stdio.h>
#include <stdbool.h>

#define MAX_PROCESSES 100

typedef struct
{
    int id;
    int arrival;
    int burst;
    int remaining;
    int completion;
    int turnaround;
    int waiting;
    float completionPercentage[100]; // For progress tracking
    int ganttStart[100];
    int ganttEnd[100];
    int ganttCount;
} Process;

void inputProcesses(Process processes[], int *n, int *quantum);
void sortProcessesByArrival(Process processes[], int n);
void simulateRoundRobin(Process processes[], int n, int quantum);
void printResults(Process processes[], int n);

int main()
{
    int n, quantum;
    Process processes[MAX_PROCESSES];

    // Input process details
    inputProcesses(processes, &n, &quantum);

    // Sort processes by arrival time
    sortProcessesByArrival(processes, n);

    // Simulate Round Robin Scheduling
    simulateRoundRobin(processes, n, quantum);

    // Print results
    printResults(processes, n);

    return 0;
}

void inputProcesses(Process processes[], int *n, int *quantum)
{
    printf("Enter the number of processes: ");
    scanf("%d", n);

    printf("Enter the time quantum: ");
    scanf("%d", quantum);

    for (int i = 0; i < *n; i++)
    {
        printf("Enter arrival time and burst time for process %d: ", i + 1);
        processes[i].id = i + 1;
        scanf("%d %d", &processes[i].arrival, &processes[i].burst);
        processes[i].remaining = processes[i].burst;
        processes[i].completion = 0;
        processes[i].turnaround = 0;
        processes[i].waiting = 0;
        processes[i].ganttCount = 0;
    }
}

void sortProcessesByArrival(Process processes[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (processes[j].arrival > processes[j + 1].arrival)
            {
                Process temp = processes[j];
                processes[j] = processes[j + 1];
                processes[j + 1] = temp;
            }
        }
    }
}

void simulateRoundRobin(Process processes[], int n, int quantum)
{
    int currentTime = 0, completed = 0;
    Process *queue[MAX_PROCESSES];
    int queueStart = 0, queueEnd = 0;

    // Add initial processes to the queue
    for (int i = 0; i < n; i++)
    {
        if (processes[i].arrival <= currentTime)
        {
            queue[queueEnd++] = &processes[i];
        }
    }

    while (completed < n)
    {
        if (queueStart == queueEnd)
        {
            // If the queue is empty, increment time and check for arrivals
            currentTime++;
            for (int i = 0; i < n; i++)
            {
                if (processes[i].arrival == currentTime)
                {
                    queue[queueEnd++] = &processes[i];
                }
            }
            continue;
        }

        // Dequeue the next process
        Process *current = queue[queueStart++];

        // Execute the process for a time slice
        int timeSlice = (current->remaining < quantum) ? current->remaining : quantum;
        current->remaining -= timeSlice;
        currentTime += timeSlice;

        // Record progress for Gantt chart
        current->ganttStart[current->ganttCount] = currentTime - timeSlice;
        current->ganttEnd[current->ganttCount] = currentTime;
        current->completionPercentage[current->ganttCount] =
            ((float)(current->burst - current->remaining) / current->burst) * 100;
        current->ganttCount++;

        // Add new arrivals to the queue
        for (int i = 0; i < n; i++)
        {
            if (processes[i].arrival > currentTime - timeSlice && processes[i].arrival <= currentTime &&
                processes[i].remaining > 0 && &processes[i] != current)
            {
                queue[queueEnd++] = &processes[i];
            }
        }

        // If the process is not finished, re-add it to the queue
        if (current->remaining > 0)
        {
            queue[queueEnd++] = current;
        }
        else
        {
            // If the process is completed, calculate metrics
            completed++;
            current->completion = currentTime;
            current->turnaround = current->completion - current->arrival;
            current->waiting = current->turnaround - current->burst;
        }
    }
}

void printResults(Process processes[], int n)
{
    printf("\nID\tArrival\tBurst\tCompletion\tTurnaround\tWaiting\n");
    for (int i = 0; i < n; i++)
    {
        printf("%d\t%d\t%d\t%d\t\t%d\t\t%d\n",
               processes[i].id,
               processes[i].arrival,
               processes[i].burst,
               processes[i].completion,
               processes[i].turnaround,
               processes[i].waiting);
    }

    // Print Gantt Chart
    printf("\nGantt Chart:\n");
    for (int i = 0; i < n; i++)
    {
        printf("P%d: ", processes[i].id);
        for (int j = 0; j < processes[i].ganttCount; j++)
        {
            printf("[%d - %d] ", processes[i].ganttStart[j], processes[i].ganttEnd[j]);
        }
        printf("\n");
    }
}
