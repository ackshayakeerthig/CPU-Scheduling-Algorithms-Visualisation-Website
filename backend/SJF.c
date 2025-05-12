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
    int ganttStart[MAX_PROCESSES]; // Start times for Gantt chart
    int ganttEnd[MAX_PROCESSES];   // End times for Gantt chart
    int ganttCount;                // Number of Gantt chart segments
} Process;

void inputProcesses(Process processes[], int *n);
void sortProcessesByArrival(Process processes[], int n);
void simulateSJF(Process processes[], int n);
void printResults(Process processes[], int n);

int main()
{
    int n;
    Process processes[MAX_PROCESSES];

    // Input process details
    inputProcesses(processes, &n);

    // Sort processes by arrival time
    sortProcessesByArrival(processes, n);

    // Simulate Shortest Job First Scheduling
    simulateSJF(processes, n);

    // Print results
    printResults(processes, n);

    return 0;
}

void inputProcesses(Process processes[], int *n)
{
    printf("Enter the number of processes: ");
    scanf("%d", n);

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

void simulateSJF(Process processes[], int n)
{
    int currentTime = 0, completed = 0;

    while (completed < n)
    {
        // Find all processes that have arrived and are not completed
        int shortestIndex = -1;
        int shortestBurst = __INT_MAX__;

        for (int i = 0; i < n; i++)
        {
            if (processes[i].arrival <= currentTime && processes[i].remaining > 0)
            {
                if (processes[i].remaining < shortestBurst)
                {
                    shortestBurst = processes[i].remaining;
                    shortestIndex = i;
                }
            }
        }

        if (shortestIndex == -1)
        {
            // No process is ready to run, increment time
            currentTime++;
            continue;
        }

        Process *selectedProcess = &processes[shortestIndex];

        // Record the Gantt chart value (start and end times)
        selectedProcess->ganttStart[selectedProcess->ganttCount] = currentTime;
        currentTime += selectedProcess->remaining;
        selectedProcess->remaining = 0;
        selectedProcess->completion = currentTime;
        selectedProcess->ganttEnd[selectedProcess->ganttCount] = currentTime;
        selectedProcess->ganttCount++;

        // Calculate turnaround time and waiting time
        selectedProcess->turnaround =
            selectedProcess->completion - selectedProcess->arrival;
        selectedProcess->waiting =
            selectedProcess->turnaround - selectedProcess->burst;

        // Update completed count
        completed++;
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
