#include <stdio.h>
#include <stdlib.h>
#include "cJSON.h"

void parse_json(const char *json_string)
{
    // Parse JSON string
    cJSON *json = cJSON_Parse(json_string);
    if (json == NULL)
    {
        printf("Error: Failed to parse JSON!\n");
        return;
    }

    // Access JSON fields (example for name, age, and skills)
    cJSON *name = cJSON_GetObjectItemCaseSensitive(json, "name");
    cJSON *age = cJSON_GetObjectItemCaseSensitive(json, "age");
    cJSON *skills = cJSON_GetObjectItemCaseSensitive(json, "skills");

    // Print name
    if (cJSON_IsString(name) && (name->valuestring != NULL))
    {
        printf("Name: %s\n", name->valuestring);
    }

    // Print age
    if (cJSON_IsNumber(age))
    {
        printf("Age: %d\n", age->valueint);
    }

    // Print skills (array)
    if (cJSON_IsArray(skills))
    {
        printf("Skills: \n");
        cJSON *skill;
        cJSON_ArrayForEach(skill, skills)
        {
            if (cJSON_IsString(skill))
            {
                printf(" - %s\n", skill->valuestring);
            }
        }
    }

    // Clean up
    cJSON_Delete(json);
}