# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.30

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /opt/homebrew/Cellar/cmake/3.30.3/bin/cmake

# The command to remove a file.
RM = /opt/homebrew/Cellar/cmake/3.30.3/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build

# Include any dependencies generated for this target.
include src-cpp/CMakeFiles/rdkafka++.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.make

# Include the progress variables for this target.
include src-cpp/CMakeFiles/rdkafka++.dir/progress.make

# Include the compile flags for this target's objects.
include src-cpp/CMakeFiles/rdkafka++.dir/flags.make

src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConfImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConfImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/ConfImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConfImpl.cpp > CMakeFiles/rdkafka++.dir/ConfImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/ConfImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConfImpl.cpp -o CMakeFiles/rdkafka++.dir/ConfImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConsumerImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConsumerImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConsumerImpl.cpp > CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ConsumerImpl.cpp -o CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HandleImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HandleImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/HandleImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HandleImpl.cpp > CMakeFiles/rdkafka++.dir/HandleImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/HandleImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HandleImpl.cpp -o CMakeFiles/rdkafka++.dir/HandleImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HeadersImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HeadersImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HeadersImpl.cpp > CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/HeadersImpl.cpp -o CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/KafkaConsumerImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/KafkaConsumerImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/KafkaConsumerImpl.cpp > CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/KafkaConsumerImpl.cpp -o CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MessageImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MessageImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/MessageImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MessageImpl.cpp > CMakeFiles/rdkafka++.dir/MessageImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/MessageImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MessageImpl.cpp -o CMakeFiles/rdkafka++.dir/MessageImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MetadataImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MetadataImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MetadataImpl.cpp > CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/MetadataImpl.cpp -o CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ProducerImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ProducerImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ProducerImpl.cpp > CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/ProducerImpl.cpp -o CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/QueueImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/QueueImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/QueueImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/QueueImpl.cpp > CMakeFiles/rdkafka++.dir/QueueImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/QueueImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/QueueImpl.cpp -o CMakeFiles/rdkafka++.dir/QueueImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/RdKafka.cpp
src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o -MF CMakeFiles/rdkafka++.dir/RdKafka.cpp.o.d -o CMakeFiles/rdkafka++.dir/RdKafka.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/RdKafka.cpp

src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/RdKafka.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/RdKafka.cpp > CMakeFiles/rdkafka++.dir/RdKafka.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/RdKafka.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/RdKafka.cpp -o CMakeFiles/rdkafka++.dir/RdKafka.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_11) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/TopicImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicImpl.cpp > CMakeFiles/rdkafka++.dir/TopicImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/TopicImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicImpl.cpp -o CMakeFiles/rdkafka++.dir/TopicImpl.cpp.s

src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/flags.make
src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o: /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicPartitionImpl.cpp
src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o: src-cpp/CMakeFiles/rdkafka++.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_12) "Building CXX object src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o -MF CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o.d -o CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o -c /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicPartitionImpl.cpp

src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.i"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicPartitionImpl.cpp > CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.i

src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.s"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp/TopicPartitionImpl.cpp -o CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.s

# Object files for target rdkafka++
rdkafka_______OBJECTS = \
"CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/RdKafka.cpp.o" \
"CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o" \
"CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o"

# External object files for target rdkafka++
rdkafka_______EXTERNAL_OBJECTS =

src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/ConfImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/ConsumerImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/HandleImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/HeadersImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/KafkaConsumerImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/MessageImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/MetadataImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/ProducerImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/QueueImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/RdKafka.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/TopicImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/TopicPartitionImpl.cpp.o
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/build.make
src-cpp/librdkafka++.a: src-cpp/CMakeFiles/rdkafka++.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=/Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_13) "Linking CXX static library librdkafka++.a"
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && $(CMAKE_COMMAND) -P CMakeFiles/rdkafka++.dir/cmake_clean_target.cmake
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/rdkafka++.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
src-cpp/CMakeFiles/rdkafka++.dir/build: src-cpp/librdkafka++.a
.PHONY : src-cpp/CMakeFiles/rdkafka++.dir/build

src-cpp/CMakeFiles/rdkafka++.dir/clean:
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp && $(CMAKE_COMMAND) -P CMakeFiles/rdkafka++.dir/cmake_clean.cmake
.PHONY : src-cpp/CMakeFiles/rdkafka++.dir/clean

src-cpp/CMakeFiles/rdkafka++.dir/depend:
	cd /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka /Users/teddym/.cargo/registry/src/index.crates.io-6f17d22bba15001f/rdkafka-sys-4.7.0+2.3.0/librdkafka/src-cpp /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp /Users/teddym/side_projects/commitwise/backend/rust_worker/target/debug/build/rdkafka-sys-ac72a319191d5b03/out/build/src-cpp/CMakeFiles/rdkafka++.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : src-cpp/CMakeFiles/rdkafka++.dir/depend

