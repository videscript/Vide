# Vide
__________

## config 

A very important part of Vide is to make sure that you or your team using Vide doesn't have to spend years in the config. So Vide uses a very easy to read syntax for the config (it is almost a mix between Yaml and Json). Incase you want to stick with normal Json you can.

### Non-standard Library

The non-standard library is a custom syntax used for writing videfile's. It is similar to Json but without the colons and commas.

The syntax pattern is as follows:
```
keyword value 
or
keyword {
    value
}
```

To import the non-standard library use:

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-2-library.png'/>

This line will tell the compiler that it should use the the non standard compiler and not parse Json.


### Config Hooks

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-3-hooks.png'/>

Config hooks allow you to add custom events before or after the code is compiled. Events are written in Javascript. 

### Basic things

#### Settings Output Directory

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-5-out-json.png'/>

```
{
    "outDir":"src"
}
```
**Json version**

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-4-outDir.png'/>

```
outDir src

```

**Non-Standard Version**

This specifies the out directory for the compiled code.

#### settings root directory 

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-7-root.png'/>

```
outDir .
```
**Non-Standard Version**

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-8-root-json.png'/>

**Json Version**

This options states the root directory or where your source code (.vide files) is.

#### comments 

<img src='https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-6-comment.png'/>

```
// comment
```
Comment lines can written as such.

### Basic Config

<img src="https://bitbucket.org/ashtyn372/vide/raw/70170eb18e4829901364c9a4cc6da1f37559b701/images/example-config.png" style='margin:0;padding:0;'/>
