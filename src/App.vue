<template>
  <div
    class="min-h-screen bg-slate-900 text-white p-4 md:p-8"
    style="zoom: 150%"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold mb-2">
          Photo Collage Creator
        </h1>
        <p class="text-slate-300">
          Create beautiful photo collages with your favorite images
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 bg-slate-800 rounded-xl p-5 h-fit">
          <h2 class="text-xl font-semibold mb-4">Collage Settings</h2>

          <!-- Layout Selection -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">
              Choose Layout
            </h3>
            <div class="grid grid-cols-3 gap-3">
              <button
                @click="setLayout('2x1')"
                class="p-3 rounded-lg border-2 transition-all"
                :class="
                  layout === '2x1'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                "
              >
                <div class="grid grid-cols-2 gap-1 h-12">
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                </div>
                <span class="text-xs mt-2 block text-center">2 × 1</span>
              </button>

              <button
                @click="setLayout('2x2')"
                class="p-3 rounded-lg border-2 transition-all"
                :class="
                  layout === '2x2'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                "
              >
                <div class="grid grid-cols-2 gap-1 h-12">
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                </div>
                <span class="text-xs mt-2 block text-center">2 × 2</span>
              </button>

              <button
                @click="setLayout('2x4')"
                class="p-3 rounded-lg border-2 transition-all"
                :class="
                  layout === '2x4'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                "
              >
                <div class="grid grid-cols-4 gap-1 h-12">
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                  <div class="bg-slate-300 rounded"></div>
                </div>
                <span class="text-xs mt-2 block text-center">2 × 4</span>
              </button>
            </div>
          </div>

          <!-- Spacing Control -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <h3 class="text-sm font-medium text-slate-300">Border Spacing</h3>
              <span class="text-sm text-blue-400">{{ spacing }}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              v-model="spacing"
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <!-- Filter Selection -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">
              Apply Filter
            </h3>
            <select
              v-model="filter"
              class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">No Filter</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="blur">Blur</option>
              <option value="brightness">Brightness</option>
              <option value="contrast">Contrast</option>
            </select>
          </div>

          <!-- Add this section below the Filter Selection -->
          <div class="mb-6" v-if="activePhotoIndex !== null">
            <h3 class="text-sm font-medium text-slate-300 mb-3">
              Photo Adjustments
            </h3>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-xs text-slate-400">Brightness</span>
                  <span class="text-xs text-blue-400"
                    >{{ photoAdjustments.brightness }}%</span
                  >
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  v-model="photoAdjustments.brightness"
                  class="w-full range-slider"
                />
              </div>

              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-xs text-slate-400">Contrast</span>
                  <span class="text-xs text-blue-400"
                    >{{ photoAdjustments.contrast }}%</span
                  >
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  v-model="photoAdjustments.contrast"
                  class="w-full range-slider"
                />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="downloadCollage"
              class="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center justify-center"
            >
              <Download class="h-4 w-4 mr-2" />
              Download Collage
            </button>

            <button
              @click="printCollage"
              class="w-full py-2.5 px-4 rounded-lg border border-blue-600 hover:bg-blue-600/10 text-blue-400 font-medium transition-colors flex items-center justify-center"
            >
              <Printer class="h-4 w-4 mr-2" />
              Print Collage
            </button>

            <button
              @click="resetCollage"
              class="w-full py-2.5 px-4 rounded-lg border border-slate-600 hover:bg-slate-700 text-slate-300 font-medium transition-colors flex items-center justify-center"
            >
              <RefreshCw class="h-4 w-4 mr-2" />
              Reset Collage
            </button>
          </div>
        </div>

        <!-- Collage Preview Area -->
        <div class="lg:col-span-2 bg-slate-800 rounded-xl p-5 flex flex-col">
          <h2 class="text-xl font-semibold mb-4">Collage Preview</h2>

          <!-- Collage Container -->
          <div
            ref="collageRef"
            class="flex-grow flex items-center justify-center"
          >
            <div
              class="collage-container max-w-2xl mx-auto"
              :class="{ 'w-[16cm]': layout !== '2x4' }"
              :style="{
                gap: `${spacing}px`,
                backgroundColor: 'white',
                filter: getFilterStyle,
              }"
            >
              <div
                :class="{
                  'grid gap-1': true,
                  'grid-cols-1 grid-rows-2': layout === '2x1',
                  'grid-cols-2 grid-rows-2': layout === '2x2',
                  'grid-cols-4 grid-rows-2': layout === '2x4',
                }"
                class="w-fit"
                :style="{ gap: `${spacing}px` }"
              >
                <div
                  v-for="(cell, index) in cellCount"
                  :key="index"
                  class="!w-[3.5cm] !h-[4.5cm] relative bg-slate-700 overflow-hidden flex items-center justify-center cursor-pointer"
                  @click="handlePhotoClick(index)"
                >
                  <div v-if="photos[index]" class="group">
                    <img
                      :src="photos[index].url"
                      class="w-full h-full object-cover"
                      :style="{
                        filter: `
          brightness(${photos[index].adjustments.brightness}%)
          contrast(${photos[index].adjustments.contrast}%)
          ${getFilterStyle}
        `,
                      }"
                    />
                    <button
                      @click.stop="removePhoto(index)"
                      class="hidden group-hover:inline-block absolute top-2 right-2 bg-slate-900/70 text-white p-1 rounded-full hover:bg-red-500/70 transition-colors"
                    >
                      <X class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activePhotoIndex === index"
                      class="absolute inset-0 pointer-events-none"
                    ></div>
                  </div>
                  <template v-else>
                    <ImagePlus class="h-8 w-8 text-slate-500" />
                    <span class="text-xs text-slate-500 absolute bottom-2"
                      >Click to add photo</span
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- Photo Library -->
          <div
            v-if="photoLibrary.length > 0"
            class="bg-slate-800 rounded-xl p-5"
          >
            <h2 class="text-xl font-semibold mb-4">Your Photo Library</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              <div
                v-for="(photo, index) in photoLibrary"
                :key="index"
                class="aspect-square rounded overflow-hidden relative group cursor-pointer"
                @click="addPhotoFromLibrary(photo)"
              >
                <img :src="photo.url" class="w-full h-full object-cover" />
                <div
                  class="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors flex items-center justify-center"
                >
                  <button
                    class="opacity-0 group-hover:opacity-100 bg-blue-600 text-white p-2 rounded-full transition-opacity"
                  >
                    <Plus class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Drag & Drop Zone -->
          <!--  <div
            class="mt-4 border-2 border-dashed border-slate-700 rounded-lg p-6 text-center"
            :class="{ 'border-blue-500 bg-blue-500/5': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <Upload class="h-6 w-6 mx-auto text-slate-400" />
            <p class="mt-2 text-sm text-slate-300">
              Drag and drop images here or
              <label class="text-blue-400 cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="handleFileSelect"
                />
              </label>
            </p>
            <p class="text-xs text-slate-500 mt-1">
              Supports JPG, PNG, GIF (max 5MB)
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import {
  Download,
  Printer,
  RefreshCw,
  ImagePlus,
  X,
  Upload,
  Plus,
} from "lucide-vue-next";
import html2canvas from "html2canvas";

// State
const layout = ref("2x2");
const spacing = ref(4);
const borderColor = ref("#3b82f6"); // blue-500
const filter = ref("none");
const photos = ref([]);
const photoLibrary = ref([]);
const isDragging = ref(false);
const collageRef = ref(null);
const activePhotoIndex = ref(null);
// Computed
const cellCount = computed(() => {
  switch (layout.value) {
    case "2x1":
      return 2;
    case "2x2":
      return 4;
    case "2x4":
      return 8;
    default:
      return 4;
  }
});

const getFilterStyle2 = computed(() => {
  switch (filter.value) {
    case "grayscale":
      return "grayscale(1)";
    case "sepia":
      return "sepia(0.7)";
    case "blur":
      return "blur(1px)";
    case "brightness":
      return "brightness(1.2)";
    case "contrast":
      return "contrast(1.5)";
    default:
      return "none";
  }
});

// Border color options
const borderColors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Green", value: "#10b981" },
  { name: "Black", value: "#111827" },
  { name: "White", value: "#ffffff" },
];

// Methods
const setLayout = (newLayout) => {
  layout.value = newLayout;
  // Resize photos array to match new layout
  const newPhotos = [];
  for (let i = 0; i < cellCount.value; i++) {
    newPhotos[i] = photos.value[i] || null;
  }
  photos.value = newPhotos;
};

const openFileSelector = (index) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      addPhoto(file, index);
    }
  };
  input.click();
};

const addPhoto2 = (file, index) => {
  if (file.type.match("image.*")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoObj = {
        url: e.target.result,
        name: file.name,
        type: file.type,
      };

      // Add to specific position in collage
      const newPhotos = [...photos.value];
      newPhotos[index] = photoObj;
      photos.value = newPhotos;

      // Add to library if not already there
      if (!photoLibrary.value.some((p) => p.url === photoObj.url)) {
        photoLibrary.value.push(photoObj);
      }
    };
    reader.readAsDataURL(file);
  }
};

const addPhotoFromLibrary = (photo) => {
  // Find first empty slot
  const emptyIndex = photos.value.findIndex((p) => !p);
  if (emptyIndex !== -1) {
    const newPhotos = [...photos.value];
    newPhotos[emptyIndex] = photo;
    photos.value = newPhotos;
  }
};

const removePhoto2 = (index) => {
  const newPhotos = [...photos.value];
  newPhotos[index] = null;
  photos.value = newPhotos;
};

// Modified addPhoto function
const addPhoto = (file, index) => {
  if (file.type.match("image.*")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoObj = {
        url: e.target.result,
        name: file.name,
        type: file.type,
        adjustments: {
          brightness: 100,
          contrast: 100,
        },
      };

      const newPhotos = [...photos.value];
      newPhotos[index] = photoObj;
      photos.value = newPhotos;

      if (!photoLibrary.value.some((p) => p.url === photoObj.url)) {
        photoLibrary.value.push({ ...photoObj });
      }

      activePhotoIndex.value = index;
    };
    reader.readAsDataURL(file);
  }
};

// Modified removePhoto function
const removePhoto = (index) => {
  const newPhotos = [...photos.value];
  newPhotos[index] = null;
  photos.value = newPhotos;
  activePhotoIndex.value = null;
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    // Find first empty slot
    let emptyIndex = photos.value.findIndex((p) => !p);

    for (let i = 0; i < files.length; i++) {
      if (emptyIndex !== -1 && emptyIndex < cellCount.value) {
        addPhoto(files[i], emptyIndex);
        emptyIndex = photos.value.findIndex((p, idx) => !p && idx > emptyIndex);
      } else {
        // Just add to library
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoObj = {
            url: e.target.result,
            name: file.name,
            type: file.type,
          };

          if (!photoLibrary.value.some((p) => p.url === photoObj.url)) {
            photoLibrary.value.push(photoObj);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
};

const handleDrop = (event) => {
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    // Find first empty slot
    let emptyIndex = photos.value.findIndex((p) => !p);

    for (let i = 0; i < files.length; i++) {
      if (emptyIndex !== -1 && emptyIndex < cellCount.value) {
        addPhoto(files[i], emptyIndex);
        emptyIndex = photos.value.findIndex((p, idx) => !p && idx > emptyIndex);
      } else {
        // Just add to library
        const file = files[i];
        if (file.type.match("image.*")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const photoObj = {
              url: e.target.result,
              name: file.name,
              type: file.type,
            };

            if (!photoLibrary.value.some((p) => p.url === photoObj.url)) {
              photoLibrary.value.push(photoObj);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
};

const downloadCollage = async () => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match the collage container's actual size
    const collageContainer = document.querySelector(".collage-container");
    if (!collageContainer) return;

    // Get the actual dimensions of the collage container
    const rect = collageContainer.getBoundingClientRect();
    const scale = window.devicePixelRatio; // Get the device pixel ratio

    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    // Scale the context to match the device pixel ratio
    ctx.scale(scale, scale);

    // Set white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Convert collage container to data URL
    const dataUrl = await html2canvas(collageContainer, {
      scale: scale * 5, // Use device pixel ratio for scaling
      useCORS: true,
      allowTaint: true,
      backgroundColor: "white",
      logging: false,
      width: rect.width,
      height: rect.height,
    }).then((canvas) => canvas.toDataURL("image/png"));

    // Create download link
    const link = document.createElement("a");
    link.download = "collage.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error downloading collage:", error);
  }
};

const printCollage = async () => {
  if (!collageRef.value) return;

  try {
    const canvas = await html2canvas(
      collageRef.value.querySelector(".collage-container")
    );
    const dataUrl = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    const htmlContent = `
      <html>
        <head>
          <title>Print Collage</title>
          <style>
            /* Reset all margins and padding */
            body {
              margin: 0 !important;
              padding: 0 !important;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background: white !important;
            }

            img {
              max-width: 100% !important;
              max-height: 100vh !important;
              object-fit: contain;
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
            }

            /* Remove page margins */
            @page {
              margin: 0 !important;
              size: auto;
              padding: 0;
            }

            @media print {
              body {
                height: auto !important;
              }
              img {
                max-height: 100% !important;
              }
            }
          </style>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 300);
            }
          <\/script>
        </head>
        <body>
          <img src='${dataUrl}' alt='collage preview' 
               onerror="window.close()" />
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } catch (error) {
    console.error("Error printing collage:", error);
    alert("Failed to print collage. Please try again.");
  }
};

// Modified getFilterStyle computed property
const getFilterStyle = computed(() => {
  const activeFilter = filter.value;
  let filterStyle = "";

  if (activePhotoIndex.value !== null) {
    const adjustments = photos.value[activePhotoIndex.value]?.adjustments || {};
    filterStyle += `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) `;
  }

  switch (activeFilter) {
    case "grayscale":
      filterStyle += "grayscale(1)";
      break;
    case "sepia":
      filterStyle += "sepia(0.7)";
      break;
    case "blur":
      filterStyle += "blur(1px)";
      break;
    case "brightness":
      filterStyle += "brightness(1.2)";
      break;
    case "contrast":
      filterStyle += "contrast(1.5)";
      break;
  }

  return filterStyle.trim();
});

// Load saved settings on mount
onMounted(() => {
  const savedData = localStorage.getItem("collageSettings");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      layout.value = parsedData.layout || "2x2";
      spacing.value = parsedData.spacing ?? 20;
      filter.value = parsedData.filter || "none";
      photos.value = parsedData.photos || [];
      photoLibrary.value = parsedData.photoLibrary || [];

      // Initialize adjustments for legacy data
      photos.value = photos.value.map((photo) => ({
        ...photo,
        adjustments: photo.adjustments || { brightness: 100, contrast: 100 },
      }));
    } catch (e) {
      console.error("Error loading saved settings:", e);
    }
  }
});

// Update resetCollage function
const resetCollage = () => {
  localStorage.removeItem("collageSettings");
  layout.value = "2x2";
  spacing.value = 20;
  filter.value = "none";
  photos.value = Array(cellCount.value).fill(null);
  photoLibrary.value = [];
  activePhotoIndex.value = null;
};
// New click handler for photo cells
const handlePhotoClick = (index) => {
  if (photos.value[index]) {
    activePhotoIndex.value = index;
    photoAdjustments.value = {
      brightness: photos.value[index].adjustments.brightness,
      contrast: photos.value[index].adjustments.contrast,
    };
  } else {
    openFileSelector(index);
  }
};

// Watcher for adjustment changes
watchEffect(() => {
  if (activePhotoIndex.value !== null && photos.value[activePhotoIndex.value]) {
    photos.value[activePhotoIndex.value].adjustments = {
      brightness: photoAdjustments.value.brightness,
      contrast: photoAdjustments.value.contrast,
    };
  }
});

const photoAdjustments = ref({
  brightness: 100,
  contrast: 100,
});

// Watch for changes in settings and photos to save to localStorage
watchEffect(() => {
  const saveData = {
    layout: layout.value,
    spacing: spacing.value,
    filter: filter.value,
    photos: photos.value,
    photoLibrary: photoLibrary.value,
  };
  localStorage.setItem("collageSettings", JSON.stringify(saveData));
});

// Initialize photos array based on default layout
onMounted(() => {
  photos.value = Array(cellCount.value).fill(null);
});
</script>

<style scoped>
.collage-container {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease;
}

/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #334155;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  background: #60a5fa;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  background: #60a5fa;
}
</style>

<style>
/* Add this at the top of your style section */
:root {
  /* zoom: 120%; */
}
</style>
