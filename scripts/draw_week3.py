"""Draw the eight Week 3 illustrations and inspectable magenta proofs."""
import argparse
from pathlib import Path
from tempfile import TemporaryDirectory

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Rectangle
import numpy as np
from PIL import Image

INK = "#16304b"
TEAL = "#28877c"
BLUE = "#d6e9f7"
GREEN = "#dceee4"
GOLD = "#fae9c5"
LILAC = "#e9dff4"
CREAM = "#fff9ee"
DPI = 160
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 14, "text.color": INK,
    "axes.labelcolor": INK, "axes.edgecolor": INK, "xtick.color": INK,
    "ytick.color": INK, "mathtext.default": "regular",
})


def canvas(title, width=12, height=8):
    fig = plt.figure(figsize=(width, height))
    fig.text(.5, .93, title, ha="center", fontsize=27, weight="bold")
    return fig


def panel(fig):
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set(xlim=(0, 1), ylim=(0, 1))
    ax.axis("off")
    return ax


def label(ax, x, y, w, h, text, colour=CREAM, size=16):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=.008,rounding_size=.015",
                               facecolor=colour, edgecolor=INK, linewidth=1.7))
    ax.text(x+w/2, y+h/2, text, ha="center", va="center", fontsize=size, weight="medium")


def arrow(ax, start, end, colour=INK):
    ax.add_patch(FancyArrowPatch(start, end, arrowstyle="-|>", mutation_scale=18,
                                linewidth=1.9, color=colour))


def plot_style(ax):
    ax.spines[["right", "top"]].set_visible(False)
    ax.grid(color=INK, alpha=.13)
    ax.set_axisbelow(True)


def grid(fig, bounds, n, highlight=None, padded=False):
    ax = fig.add_axes(bounds)
    ax.set(xlim=(0, n), ylim=(n, 0), aspect="equal")
    ax.axis("off")
    ax.add_patch(Rectangle((0, 0), n, n, facecolor=BLUE, edgecolor=INK, linewidth=2))
    for i in range(1, n):
        ax.plot([i, i], [0, n], color=INK, linewidth=.6, alpha=.6)
        ax.plot([0, n], [i, i], color=INK, linewidth=.6, alpha=.6)
    if padded:
        for row in range(n):
            for col in range(n):
                if row in (0, n-1) or col in (0, n-1):
                    ax.add_patch(Rectangle((col, row), 1, 1, facecolor=GOLD,
                                           edgecolor=INK, linewidth=.6))
                    ax.text(col+.5, row+.53, "0", ha="center", va="center", fontsize=11)
    if highlight:
        col, row, colour, dashed = highlight
        ax.add_patch(Rectangle((col+.02, row+.02), 3.96, 3.96, facecolor="none",
                               edgecolor=colour, linewidth=2.6, linestyle=dashed))
    return ax


def counter_example():
    fig = canvas("A fixed classifier can be fooled")
    offsets = np.array([[-.35,-.1],[-.24,.25],[-.1,-.32],[.02,.03],
                        [.13,.35],[.22,-.2],[.31,.12],[.4,-.02]])
    for i, (title, fake_center) in enumerate([
        ("Before · the line separates the clusters", (2.2, 1.4)),
        ("After · classifier fails", (-2.2, 1.4)),
    ]):
        ax = fig.add_axes([.09 + i*.46, .26, .37, .51], facecolor=CREAM)
        real = offsets + (-2.2, -1.4)
        fake = offsets + fake_center
        ax.axvline(0, linestyle="--", color=INK, linewidth=1.8)
        ax.scatter(*real.T, marker="x", s=95, color=TEAL, linewidths=2.3, zorder=3)
        ax.scatter(*fake.T, s=65, color="#b76b33", edgecolor=INK, linewidth=.5, zorder=3)
        ax.set(xlim=(-3.6,3.6), ylim=(-2.6,2.6), xlabel="x1", ylabel="x2")
        ax.set_title(title, fontsize=16, color=INK, weight="bold", pad=12)
        plot_style(ax)
    fig.text(.5,.14,"×  Real data      ●  Generated data      – –  Same decision line",
             ha="center", fontsize=16)
    fig.text(.5,.087,"The generated cluster crosses the line and stays far from the real cluster.",
             ha="center", fontsize=14)
    return fig


def transposed_conv():
    fig = canvas("Grow a feature map with transposed convolution")
    ax = panel(fig)
    input_grid = grid(fig, [.06,.31,.25,.46], 7, (0,1,TEAL,"--"))
    input_grid.add_patch(Rectangle((1.02,1.02),3.96,3.96,facecolor="none",
                                   edgecolor="#ad5f2c",linewidth=2.4))
    arrow(input_grid,(.6,5.7),(1.8,5.7),"#ad5f2c")
    grid(fig, [.40,.40,.17,.29], 4)
    output_grid = grid(fig, [.66,.29,.28,.50], 15)
    for x in (4,6):
        output_grid.add_patch(Rectangle((x,5),4,4,facecolor=TEAL,edgecolor=INK,alpha=.28))
    for x, text in ((.185,"7 × 7 input"),(.485,"4 × 4 kernel"),(.8,"15 × 15 output")):
        ax.text(x,.265,text,ha="center",fontsize=18,weight="bold")
    arrow(ax,(.32,.54),(.39,.54))
    arrow(ax,(.575,.54),(.65,.54))
    ax.text(.5,.18,"Stride 2 · padding 1 · output padding 1",ha="center",fontsize=16)
    label(ax,.095,.05,.81,.075,r"$H_{out} = (7-1)\cdot 2 - 2\cdot 1 + 4 + 1 = 15$",GOLD,23)
    return fig


def dcgan_generator():
    fig = canvas("From noise to a picture")
    ax = panel(fig)
    labels = [("Noise\n100",BLUE),("256\nchannels",LILAC),("128\nchannels",GREEN),
              ("1 channel\n(picture)",GOLD)]
    xs = [.04,.29,.54,.79]
    for x,(text,colour) in zip(xs,labels):
        label(ax,x,.41,.17,.23,text,colour,22)
    for i,text in enumerate(("ReLU","ReLU","tanh")):
        start,end=xs[i]+.178,xs[i+1]-.008
        arrow(ax,(start,.52),(end,.52))
        ax.text((start+end)/2,.69,text,ha="center",fontsize=16,weight="bold")
    return fig


def log_curve():
    fig = canvas("How log scores a probability")
    ax = fig.add_axes([.13,.18,.75,.62],facecolor=CREAM)
    chance=np.linspace(.01,1,600)
    ax.plot(chance,np.log(chance),color=TEAL,linewidth=3)
    ax.scatter([1],[0],s=100,color="#c2833f",edgecolor=INK,zorder=3)
    ax.annotate("top score",xy=(1,0),xytext=(.74,-.75),color=INK,
                arrowprops={"arrowstyle":"->","color":INK})
    ax.annotate("very negative",xy=(.019,np.log(.019)),xytext=(.17,-3.85),color=INK,
                arrowprops={"arrowstyle":"->","color":INK})
    ax.set(xlim=(0,1.055),ylim=(-4.9,.35),xlabel=r"chance $D_w(x)$",ylabel=r"log $D_w(x)$")
    plot_style(ax)
    return fig


def saddle_point():
    fig = canvas(r"A saddle on $f(a,b)=a^2-b^2$")
    ax=fig.add_axes([.11,.18,.78,.68],projection="3d",computed_zorder=False)
    q=np.linspace(-1.6,1.6,29)
    a,b=np.meshgrid(q,q)
    ax.plot_surface(a,b,a*a-b*b,color=BLUE,edgecolor=INK,linewidth=.34,
                    alpha=.72,shade=False,zorder=1)
    t=np.linspace(0,1.42,80)
    ax.plot(t,0*t,t*t+.03,color=TEAL,linewidth=3.6,zorder=8)
    ax.plot(0*t,t,-t*t+.03,color="#ad5f2c",linewidth=3.6,zorder=8)
    ax.quiver(1.19,0,1.19**2,.23,0,1.42**2-1.19**2,color=TEAL,arrow_length_ratio=.48,linewidth=2.8,zorder=9)
    ax.quiver(0,1.19,-1.19**2,0,.23,-1.42**2+1.19**2,color="#ad5f2c",
              arrow_length_ratio=.48,linewidth=2.8,zorder=9)
    ax.scatter([0],[0],[0],s=105,color=INK,edgecolor="white",linewidth=1,depthshade=False,zorder=11)
    ax.set(xlabel="a",ylabel="b",zlabel="f",zlim=(-2.9,2.9))
    ax.view_init(26,-54)
    for axis in (ax.xaxis,ax.yaxis,ax.zaxis):
        axis.set_pane_color((1,1,1,0))
    fig.text(.5,.16,"●  Saddle at (0, 0)",ha="center",fontsize=15)
    fig.text(.08,.078,"Along a · classifier: goes up",color=TEAL,fontsize=16,weight="bold")
    fig.text(.54,.078,"Along b · generator: goes down",color="#995022",fontsize=16,weight="bold")
    return fig


def activation_shapes():
    fig = canvas("Four activation shapes",16,8)
    x=np.linspace(-4,4,401)
    plots=[
        ("ReLU: max(0, x)",np.maximum(x,0),(-.2,4.25),BLUE),
        ("LeakyReLU\nslope 0.1 for negatives",np.where(x<0,.1*x,x),(-.65,4.25),GREEN),
        ("tanh(x)\nrange −1 to 1",np.tanh(x),(-1.18,1.18),LILAC),
        ("sigmoid 1/(1+e⁻ˣ)\nrange 0 to 1",1/(1+np.exp(-x)),(-.10,1.10),GOLD),
    ]
    for i,(title,y,ylim,colour) in enumerate(plots):
        ax=fig.add_axes([.065+i*.233,.21,.195,.50],facecolor=colour)
        ax.plot(x,y,color=TEAL,linewidth=2.7)
        ax.axvline(0,color=INK,alpha=.30)
        ax.axhline(0,color=INK,alpha=.30)
        ax.set(xlim=(-4,4),ylim=ylim,xticks=[-4,-2,0,2,4],xlabel="x")
        ax.set_title(title,color=INK,fontsize=17,weight="bold",pad=13)
        plot_style(ax)
    return fig


def stride_padding():
    fig=canvas("Stride controls the move. Padding adds a border.")
    ax=panel(fig)
    for y,stride in ((.50,1),(.16,2)):
        ax.text(.04,y+.185,f"Stride {stride}",fontsize=18,weight="bold")
        ax.text(.04,y+.135,f"Move {stride} "+("cell" if stride==1 else "cells"),fontsize=14)
        grid(fig,[.235,y,.18,.27],7,(0,1,TEAL,"-"))
        grid(fig,[.474,y,.18,.27],7,(stride,1,TEAL,"-"))
        arrow(ax,(.415,y+.133),(.469,y+.133))
    grid(fig,[.718,.272,.232,.38],9,padded=True)
    ax.text(.835,.215,"padding p = 1",ha="center",fontsize=17,weight="bold")
    ax.text(.835,.17,"One cell of zeros around the 7 × 7 grid",ha="center",fontsize=10.5)
    return fig


def one_hot_embedding():
    fig=canvas("One-hot label and learned embedding")
    ax=panel(fig)
    for i in range(10):
        x=.075+i*.085
        label(ax,x,.57,.069,.09,"1" if i==3 else "0",GOLD if i==3 else BLUE,19)
        ax.text(x+.0345,.70,str(i),ha="center",fontsize=14)
    ax.text(.5,.775,"One-hot representation of label 3",ha="center",fontsize=18,weight="bold")
    values=["0.24","−0.16","0.07","0.42","−0.08","0.13","0.31","−0.27","0.05","−0.11"]
    for i,value in enumerate(values):
        label(ax,.075+i*.085,.295,.069,.09,value,GREEN,13)
    ax.text(.5,.43,"embedding for label 3",ha="center",fontsize=18,weight="bold")
    ax.text(.5,.22,"Example learned values",ha="center",fontsize=13)
    ax.text(.5,.105,"Same label, two ways to write it",ha="center",fontsize=20,weight="bold")
    return fig


FIGURES = {
    "img01-counter-example.webp": counter_example,
    "img04-transposed-conv.webp": transposed_conv,
    "img05-dcgan-generator.webp": dcgan_generator,
    "img08-log-curve.webp": log_curve,
    "img09-saddle-point.webp": saddle_point,
    "img10-activation-shapes.webp": activation_shapes,
    "img11-stride-padding.webp": stride_padding,
    "img12-one-hot-embedding.webp": one_hot_embedding,
}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    parser.add_argument("--proofs", type=Path, required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    args.proofs.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)/"figure.png"
        for name, draw in FIGURES.items():
            fig = draw()
            fig.savefig(tmp, dpi=DPI, transparent=True)
            plt.close(fig)
            path = args.output/name
            with Image.open(tmp) as source:
                source.convert("RGBA").save(path, "WEBP", lossless=True)
            with Image.open(path) as webp:
                rgba = webp.convert("RGBA")
                alpha = rgba.getchannel("A")
                assert rgba.width >= 1536 and alpha.getextrema() == (0,255)
                left,top,right,bottom = alpha.getbbox()
                assert min(left,top,rgba.width-right,rgba.height-bottom) >= 8, name
                background = Image.new("RGBA",rgba.size,"#ff00ff")
                proof = Image.alpha_composite(background,rgba).convert("RGB")
                proof.thumbnail((940,620))
                proof.save(args.proofs/(path.stem+".png"))
                print(f"{name}\t{rgba.width} × {rgba.height}\t{path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
