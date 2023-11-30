<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { route } from 'momentum-trail'; // If you're using the 'route' function from 'momentum-trail'

defineProps<{
    selectedCategory: string,
}>();

function pluralType(inputString) {
    if (typeof inputString !== 'string') {
        // Handle the case where inputString is not a string
        return '';
    }

    const words = inputString.split(" ");
    const modifiedWords = [];

    for (const word of words) {
        if (word.toLowerCase() === "pants" || word.toLowerCase() === "recent") {
            modifiedWords.push(word);
        } else {
          if (word.toLowerCase() === "accessory"){
           return "Accessories";
          }
            modifiedWords.push(word + "s");
        }
    }

    return modifiedWords.join(" ");
}
</script>

<template>
    <div class="mb-2 align-middle grid-x">
        <div class="cell large-3">
            <div class="mb-2 text-xl fw-semibold">
                {{ pluralType(selectedCategory) }}
            </div>
        </div>
        <div class="cell large-9">
            <div class="gap-2 align-middle flex-container-lg">
                <input type="text" class="mb-2 form form-xs form-has-section-color" placeholder="Search..." />
                <select class="mb-2 form form-xs form-select form-has-section-color">
                    <option value="1" selected disabled>
                        Advanced Sorting...
                    </option>
                </select>
                <div class="mb-2 flex-container flex-child-grow">
                    <input type="submit" class="btn btn-xs btn-success w-100" value="Search" />
                </div>
                <div class="mb-2 flex-container flex-child-grow">
                    <a href="#" class="text-center btn btn-info btn-xs flex-child-grow">Buy Currency</a>
                </div>
            </div>
        </div>
    </div>
</template>
